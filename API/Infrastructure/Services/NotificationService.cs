using API.Application.DTO;
using API.Application.Interfaces;
using API.Core.Models;
using IdentityX.Application.Extensions;
using IdentityX.Application.Interfaces;
using static API.Core.Models.Enums;
using IEmailService = API.Application.Interfaces.IEmailService;

namespace API.Infrastructure.Services
{
	public class NotificationService : INotificationService
	{
		private readonly IMongoDatabaseService _mongoDatabaseService;
		private readonly IEmailService _emailService;
		private readonly IAccountService _accountService;

		public NotificationService(IMongoDatabaseService mongoDatabaseService, IEmailService emailService, 
			IAccountService accountService)
        {
			_mongoDatabaseService = mongoDatabaseService;
			_emailService = emailService;
			_accountService = accountService;
		}
        public async Task ArchiveNotification(string notificationID)
		{
			var notification = await _mongoDatabaseService
				.GetInstanceOfType<Notification>(DataNodes.Notification, notificationID);

			notification.Archived = true;

			await _mongoDatabaseService.UpdateData(DataNodes.Notification, notificationID, notification);
		}

		public async Task<int> GetNotificationCount(string ownerID)
		{
			var notifications = await GetNotifications(ownerID);

			notifications = notifications.Where(n => !n.Archived);

			return notifications.Count();
		}

		public async Task<IEnumerable<Notification>> GetNotifications(string ownerID)
		{
			var result = await _mongoDatabaseService.GetCollectionOfType<Notification>(DataNodes.Notification);

			return result.Where(i => i.OwnerID == ownerID);
		}

		public async Task SendNotification(SendNotificationDto sendNotificationDto)
		{
			Notification notification = sendNotificationDto.Map<Notification>();

			notification.DateTime = DateTime.UtcNow;
			notification.Archived = false;

			await _mongoDatabaseService.StoreData(DataNodes.Notification, notification, null, true);

			var user = await _accountService.GetUserFromId(sendNotificationDto.OwnerID);

			string _saasName = Environment.GetEnvironmentVariable("SaaS_Name");

			await _emailService.SendEmail("You have received new notifications.", 
				$"{_saasName} Notifications", new List<string>(){ user.Email });
		}
	}
}
