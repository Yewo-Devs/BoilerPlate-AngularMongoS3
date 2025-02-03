using API.Application.Interfaces;
using Stripe.Checkout;
using Stripe;
using static API.Core.Models.Enums;
using SessionService = Stripe.Checkout.SessionService;
using SessionCreateOptions = Stripe.Checkout.SessionCreateOptions;
using API.Application.DTO;
using API.Core.Models.Purchases;
using IdentityX.Application.Interfaces;
using IEmailService = API.Application.Interfaces.IEmailService;
using IdentityX.Application.Extensions;
using Stripe.BillingPortal;
using Transaction = API.Core.Models.Purchases.Transaction;
using Amazon.Runtime.Internal.Util;
using Microsoft.Extensions.Caching.Memory;
using CloudinaryDotNet.Actions;

namespace API.Infrastructure.Services
{
	public class PaymentService : IPaymentService
	{
		private readonly string _apiDomain;
		private readonly string _frontEndDomain;
		private readonly string _stripeApiKey;
		private readonly string _saasName;
		private readonly string _saasOwnerEmail;
		private readonly IMongoDatabaseService _mongoDatabaseService;
		private readonly IEmailService _emailService;
		private readonly IAccountService _accountService;
		private readonly IMemoryCache _cache;

		public PaymentService(IMongoDatabaseService mongoDatabaseService, IEmailService emailService, 
			IAccountService accountService, IConfiguration configuration, IMemoryCache cache)
		{
			_cache = cache;
			_apiDomain = configuration["Api_Domain"];
			_frontEndDomain = configuration["FrontEnd_Domain"];
			_stripeApiKey = configuration["Stripe_ApiKey"];
			_saasName = configuration["SaaS_Name"];
			_saasOwnerEmail = configuration["SaaS_Owner_Email"];

			StripeConfiguration.ApiKey = _stripeApiKey;

			_mongoDatabaseService = mongoDatabaseService;
			_emailService = emailService;
			_accountService = accountService;

			InitializeAsync();
		}

		public async void InitializeAsync()
		{
			await InitWebHook();
		}

		public async Task<string> GetPaymentPage(CheckoutDto checkoutDto)
		{
			//Check if user already has a subscription and cancel it
			Core.Models.Purchases.Subscription activeSubscription = await GetSubscription(checkoutDto.CustomerId);

			if (activeSubscription != null)
			{
				//Remove free trial
				checkoutDto.FreeTrial = false;
				checkoutDto.FreeTrialPeriodDays = 0;
			}

			var sessionService = new SessionService();

			var sessionLineItemOptions = new SessionLineItemOptions
			{
				PriceData = new SessionLineItemPriceDataOptions
				{
					Currency = checkoutDto.Currency,
					UnitAmountDecimal = checkoutDto.PaymentType == PaymentTypes.SubscriptionPerUser?
					(checkoutDto.Price * 100) + ((checkoutDto.PricePerUser * (decimal)checkoutDto.NumberOfUsers) * 100):
					checkoutDto.Price * 100,
					ProductData = new SessionLineItemPriceDataProductDataOptions
					{
						Name = checkoutDto.ItemTitle,
						Description = checkoutDto.ItemDescription + (checkoutDto.PaymentType == PaymentTypes.SubscriptionPerUser? 
						$"({checkoutDto.NumberOfUsers} users)": "")
					},
					Recurring = checkoutDto.PaymentType == PaymentTypes.Subscription ?
					new SessionLineItemPriceDataRecurringOptions
					{
						Interval = checkoutDto.SubscriptionInterval.ToLower(),
					} : null,
					TaxBehavior = "inclusive",
				},
				Quantity = 1,
			};

			string stripeResultUrl = $"{_apiDomain}/payment/payment-result?session_id={{CHECKOUT_SESSION_ID}}&accountId={checkoutDto.CustomerId}";

			await _mongoDatabaseService.StoreData(DataNodes.Checkout, checkoutDto, checkoutDto.CustomerId);

			var appUser = await _accountService.GetUserFromId(checkoutDto.CustomerId);

			var options = new SessionCreateOptions
			{
				LineItems = new List<SessionLineItemOptions> { sessionLineItemOptions },
				Mode = checkoutDto.PaymentType == PaymentTypes.Subscription || 
				checkoutDto.PaymentType == PaymentTypes.SubscriptionPerUser ? "subscription" : "payment",
				SuccessUrl = stripeResultUrl,
				CancelUrl = stripeResultUrl,
				AutomaticTax = new SessionAutomaticTaxOptions { Enabled = true },
				CustomerEmail = appUser.Email,
				SubscriptionData = (checkoutDto.PaymentType == PaymentTypes.Subscription ||
				checkoutDto.PaymentType == PaymentTypes.SubscriptionPerUser) && checkoutDto.FreeTrial ?
				new SessionSubscriptionDataOptions
				{
					TrialPeriodDays = checkoutDto.FreeTrialPeriodDays
				} : null
			};

			var session = await sessionService.CreateAsync(options);

			return session.Url;
		}

		public async Task<string> HandleResult(string[] queryParams)
		{
			var sessionService = new SessionService();
			var session = await sessionService.GetAsync(queryParams[0]);

			// Retrieve customer's country
			var customerService = new CustomerService();
			var customer = session.CustomerId != null? await customerService.GetAsync(session.CustomerId) : null;

			string paymentResult = session.PaymentStatus != "paid" ? "fail" : "success";
			string resultUrl = $"{_frontEndDomain}/payment-result?result={paymentResult}";

			string customerId = queryParams[1];

			var checkoutDto = await _mongoDatabaseService.GetInstanceOfType<CheckoutDto>(DataNodes.Checkout, customerId);

			var price = checkoutDto.PaymentType == PaymentTypes.SubscriptionPerUser ?
					checkoutDto.Price + (checkoutDto.PricePerUser * (decimal)checkoutDto.NumberOfUsers) :
					checkoutDto.Price;

			if (session.PaymentStatus != "paid")
			{
				var _transaction = new Transaction
				{
					Amount = price,
					DateTime = DateTime.UtcNow,
					CustomerId = customerId,
					Id = Guid.NewGuid().ToString(),
					ItemTitle = checkoutDto.ItemTitle,
					Currency = checkoutDto.Currency,
					Status = "Failed",
					Location = customer != null? $"{customer.Address.City}, {customer.Address.Country}" : "Unknown"
				};

				await _mongoDatabaseService.StoreData(DataNodes.Transaction, _transaction, _transaction.Id);

				return resultUrl;
			}

			//Check if user already has a subscription and cancel it
			Core.Models.Purchases.Subscription activeSubscription = await GetSubscription(customerId);

			if(activeSubscription != null)
			{
				//Cancel old subscription
				await CancelSubscription(activeSubscription.SubscriptionId);
			}

			await _emailService.SendEmail($"You just got paid!!! ${checkoutDto.Price:f2}", _saasName, new List<string> { _saasOwnerEmail });

			var transaction = new Transaction
			{
				Amount = price,
				DateTime = DateTime.UtcNow,
				CustomerId = customerId,
				Id = Guid.NewGuid().ToString(),
				ItemTitle = checkoutDto.ItemTitle,
				Currency = checkoutDto.Currency,
				Status = "Success",
				Location = customer != null ? $"{customer.Address.City}, {customer.Address.Country}" : "Unknown"
			};

			await _mongoDatabaseService.StoreData(DataNodes.Transaction, transaction, transaction.Id);

			var customerPurchase = new CustomerPurchase
			{
				CustomerId = customerId,
				DateTime = DateTime.UtcNow,
				Price = price,
				ItemTitle = checkoutDto.ItemTitle,
				ItemDescription = checkoutDto.ItemDescription,
				PaymentType = checkoutDto.PaymentType,
				Currency = checkoutDto.Currency,
				FreeTrial = checkoutDto.FreeTrial,
				FreeTrialPeriodDays = checkoutDto.FreeTrialPeriodDays,
				Id = Guid.NewGuid().ToString(),
			};

			await _mongoDatabaseService.StoreData(DataNodes.CustomerPurchase, customerPurchase, $"{customerPurchase.Id}");

			if (checkoutDto.PaymentType == PaymentTypes.Subscription)
			{
				string subscriptionId = session.SubscriptionId;
				
				string interval = checkoutDto.SubscriptionInterval;

				interval = interval.First().ToString().ToUpper() + interval.Substring(1);

				interval = interval.ToLower() == "day" ? "Daily" : interval + "ly";

				var subscriptionService = new SubscriptionService();
				var _subscription = await subscriptionService.GetAsync(subscriptionId);

				var subscription = new Core.Models.Purchases.Subscription
				{
					SubscriptionId = subscriptionId,
					CustomerId = customerId,
					DateTime = DateTime.UtcNow,
					ExpiryDate = _subscription.CurrentPeriodEnd,
					Price = price,
					Currency = checkoutDto.Currency,
					ItemTitle = checkoutDto.ItemTitle,
					ItemDescription = checkoutDto.ItemDescription,
					Id = customerId,
					MemberIds = new string[1] { customerId },
					Interval = interval,
					CancellationDate = default(DateTime)
				};

				await _mongoDatabaseService.StoreData(DataNodes.Subscription, subscription, customerId);

				return $"{_frontEndDomain}/payment-result?result={paymentResult}&subscriptionInit=true";
			}

			if (checkoutDto.PaymentType == PaymentTypes.SubscriptionPerUser)
			{
				string subscriptionId = session.SubscriptionId;

				string interval = checkoutDto.SubscriptionInterval;

				interval = interval.First().ToString().ToUpper() + interval.Substring(1);

				interval = interval.ToLower() == "day" ? "Daily" : interval + "ly";

				var subscriptionService = new SubscriptionService();
				var _subscription = await subscriptionService.GetAsync(subscriptionId);

				var subscription = new Core.Models.Purchases.Subscription
				{
					SubscriptionId = subscriptionId,
					CustomerId = customerId,
					DateTime = DateTime.UtcNow,
					ExpiryDate = _subscription.CurrentPeriodEnd,
					Price = price,
					Currency = checkoutDto.Currency,
					ItemTitle = checkoutDto.ItemTitle,
					ItemDescription = checkoutDto.ItemDescription,
					Id = customerId,
					MemberIds = new string[1] { customerId },
					Interval = interval,
					CancellationDate = default(DateTime)
				};

				await _mongoDatabaseService.StoreData(DataNodes.Subscription, subscription, customerId);

				return $"{_frontEndDomain}/payment-result?result={paymentResult}&subscriptionInit=true";
			}

			await _mongoDatabaseService.DeleteData(DataNodes.Checkout, customerId);

			return resultUrl;
		}

		public async Task UpdateSubscription(UpdateSubscriptionDto updateSubscriptionDto)
		{
			var persistedSubscription = await _mongoDatabaseService
				.GetInstanceOfType<Core.Models.Purchases.Subscription>
				(DataNodes.Subscription, updateSubscriptionDto.CustomerId);

			var subscriptionService = new SubscriptionService();
			var subscription = await subscriptionService.GetAsync(persistedSubscription.SubscriptionId);

			var options = new SubscriptionUpdateOptions
			{
				Items = new List<SubscriptionItemOptions>
				{
					new SubscriptionItemOptions
					{
						Id = subscription.Items.Data[0].Id,
						PriceData = new SubscriptionItemPriceDataOptions
						{
							Currency = subscription.Items.Data[0].Price.Currency,
							UnitAmountDecimal = updateSubscriptionDto.PaymentType == PaymentTypes.SubscriptionPerUser?
							(updateSubscriptionDto.Price * 100) 
							+ ((updateSubscriptionDto.PricePerUser * 
							(decimal)updateSubscriptionDto.NumberOfUsers) * 100):
							updateSubscriptionDto.Price * 100,
							Recurring = new SubscriptionItemPriceDataRecurringOptions
							{
								Interval = updateSubscriptionDto.SubscriptionInterval,
							},
						},
						Quantity = subscription.Items.Data[0].Quantity
					}
				}
			};

			var price = updateSubscriptionDto.PaymentType == PaymentTypes.SubscriptionPerUser ?
					updateSubscriptionDto.Price + (updateSubscriptionDto.PricePerUser * (decimal)updateSubscriptionDto.NumberOfUsers) :
					updateSubscriptionDto.Price;

			var updatedSubscription = await subscriptionService
				.UpdateAsync(persistedSubscription.SubscriptionId, options);

			// Update the subscription details in Firebase
			persistedSubscription.Price = price;
			persistedSubscription.ExpiryDate = updatedSubscription.CurrentPeriodEnd;

			string interval = updateSubscriptionDto.SubscriptionInterval;

			interval = interval.First().ToString().ToUpper() + interval.Substring(1);

			interval = interval.ToLower() == "day" ? "Daily" : interval + "ly";

			persistedSubscription.Interval = interval;

			await _mongoDatabaseService
				.UpdateData(DataNodes.Subscription, persistedSubscription.CustomerId, persistedSubscription);
		}

		public async Task CancelSubscription(string subscriptionId)
		{
			var subscriptions = await _mongoDatabaseService.GetCollectionOfType<Core.Models.Purchases.Subscription>(DataNodes.Subscription);
			var subscription = subscriptions.First(sub => sub.SubscriptionId == subscriptionId);

			subscription.CancellationDate = DateTime.UtcNow;

			await _mongoDatabaseService.UpdateData(DataNodes.Subscription, subscription.CustomerId, subscription);

			var service = new SubscriptionService();
			await service.CancelAsync(subscriptionId);
		}

		public async Task HandleInvoicePaymentFailed(Invoice? invoice)
		{
			var subscriptions = await _mongoDatabaseService.GetCollectionOfType<Core.Models.Purchases.Subscription>(DataNodes.Subscription);
			var subscription = subscriptions.First(sub => sub.SubscriptionId == invoice.SubscriptionId);

			var appUser = await _accountService.GetUserFromId(subscription.CustomerId);
			await _emailService.PaymentFailedNotice(subscription, appUser);

			// Retrieve customer's country
			var customerService = new CustomerService();
			var customer = await customerService.GetAsync(invoice.CustomerId);

			var transaction = new Transaction
			{
				Amount = subscription.Price,
				DateTime = DateTime.UtcNow,
				CustomerId = subscription.CustomerId,
				Id = Guid.NewGuid().ToString(),
				ItemTitle = subscription.ItemTitle,
				Currency = subscription.Currency,
				Status = "Failed",
				Location = $"{customer.Address.City}, {customer.Address.Country}"
			};

			await _mongoDatabaseService.StoreData(DataNodes.Transaction, transaction, transaction.Id);
		}

		public async Task HandleInvoicePaymentSucceeded(Invoice? invoice)
		{
			var subscriptions = await _mongoDatabaseService.GetCollectionOfType<Core.Models.Purchases.Subscription>(DataNodes.Subscription);
			var subscription = subscriptions.First(sub => sub.SubscriptionId == invoice.SubscriptionId);

			var service = new SubscriptionService();
			var sub = await service.GetAsync(invoice.SubscriptionId);

			subscription.ExpiryDate = sub.CurrentPeriodEnd;

			await _mongoDatabaseService.UpdateData(DataNodes.Subscription, subscription.CustomerId, subscription);

			var appUser = await _accountService.GetUserFromId(subscription.CustomerId);
			var checkoutDto = subscription.Map<CheckoutDto>();

			await _emailService.SendReceipt(checkoutDto, appUser);
			await _emailService.SendEmail($"You just got paid!!! ${subscription.Price:f2}", _saasName, new List<string> { _saasOwnerEmail });

			// Retrieve customer's country
			var customerService = new CustomerService();
			var customer = await customerService.GetAsync(invoice.CustomerId);

			var transaction = new Transaction
			{
				Amount = subscription.Price,
				DateTime = DateTime.UtcNow,
				CustomerId = subscription.CustomerId,
				Id = Guid.NewGuid().ToString(),
				ItemTitle = subscription.ItemTitle,
				Currency = checkoutDto.Currency,
				Status = "Success",
				Location = $"{customer.Address.City}, {customer.Address.Country}"
			};

			await _mongoDatabaseService.StoreData(DataNodes.Transaction, transaction, transaction.Id);
		}

		public async Task<string> UpdatePaymentMethod(string subscriptionId)
		{
			try
			{
				var subscriptionService = new SubscriptionService();
				var subscription = await subscriptionService.GetAsync(subscriptionId);
				var customerId = subscription.CustomerId;

				var options = new Stripe.BillingPortal.SessionCreateOptions
				{
					Customer = customerId,
					ReturnUrl = $"{_frontEndDomain}/dashboard/billing"
				};

				var service = new Stripe.BillingPortal.SessionService();
				var session = await service.CreateAsync(options);

				var paymentMethodUpdateUrl = session.Url;

				return paymentMethodUpdateUrl;
			}
			catch
			{
				await ConfigureBillingPortalAsync();

				var subscriptionService = new SubscriptionService();
				var subscription = await subscriptionService.GetAsync(subscriptionId);
				var customerId = subscription.CustomerId;

				var options = new Stripe.BillingPortal.SessionCreateOptions
				{
					Customer = customerId,
					ReturnUrl = $"{_frontEndDomain}/dashboard/billing"
				};

				var service = new Stripe.BillingPortal.SessionService();
				var session = await service.CreateAsync(options);

				var paymentMethodUpdateUrl = session.Url;

				return paymentMethodUpdateUrl;
			}
		}

		private async Task ConfigureBillingPortalAsync()
		{
			var configurationService = new ConfigurationService();

			var options = new ConfigurationCreateOptions
			{
				BusinessProfile = new ConfigurationBusinessProfileOptions
				{
					Headline = "Manage your billing and subscriptions",
				},
				Features = new ConfigurationFeaturesOptions
				{
					CustomerUpdate = new ConfigurationFeaturesCustomerUpdateOptions
					{
						AllowedUpdates = new List<string> { "address", "email", "phone" },
						Enabled = true,
					},
					PaymentMethodUpdate = new ConfigurationFeaturesPaymentMethodUpdateOptions
					{
						Enabled = true,
					},
				},
				DefaultReturnUrl = $"{_frontEndDomain}/dashboard/billing"
			};

			// Create a new configuration
			var configuration = await configurationService.CreateAsync(options);
		}

		private async Task InitWebHook()
		{
			var service = new WebhookEndpointService();
			var existingWebhooks = await service.ListAsync(new WebhookEndpointListOptions());

			string webhookUrl = $"{_apiDomain}/payment/webhook";
			if (existingWebhooks.Data.Any(we => we.Url == webhookUrl))
				return;

			var options = new WebhookEndpointCreateOptions
			{
				Url = webhookUrl,
				EnabledEvents = new List<string>
					{
						"invoice.payment_succeeded",
						"invoice.payment_failed"
					},
				ApiVersion = "2024-04-10"
			};

			try
			{
				await service.CreateAsync(options);
			}
			catch (StripeException)
			{
				// Log the exception or handle it accordingly
			}
		}

		public async Task<Core.Models.Purchases.Subscription> GetSubscription(string userId)
		{
			if (!_cache.TryGetValue(userId, out Core.Models.Purchases.Subscription subscription))
			{
				var subscriptions = await _mongoDatabaseService
					.GetCollectionOfType<Core.Models.Purchases.Subscription>(DataNodes.Subscription);

				subscription = subscriptions.FirstOrDefault(sub => sub.MemberIds.Contains(userId));

				if (subscription != null)
				{
					var cacheEntryOptions = new MemoryCacheEntryOptions()
						.SetSlidingExpiration(TimeSpan.FromMinutes(30));

					_cache.Set(userId, subscription, cacheEntryOptions);
				}

				return subscription;
			}

			return subscription;
		}

		public async Task<IEnumerable<Transaction>> GetUserTransactions(string userId, int pageSize, int currentPage)
		{
			var transactions = await _mongoDatabaseService.GetCollectionOfType<Transaction>(DataNodes.Transaction);

			transactions = transactions.Where(t => t.CustomerId == userId)
				.OrderByDescending(t => t.DateTime)
				.Skip(pageSize * (currentPage - 1))
				.Take(pageSize);

			return transactions;
		}
	}
}
