﻿using API.Application.Interfaces;
using API.Infrastructure.Services;
using Microsoft.Extensions.Caching.Memory;

namespace API.Application.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
			services.AddMemoryCache();
			services.AddScoped<ISchedulerService, SchedulerService>();
			services.AddScoped<ITicketService, TicketService>();
            services.AddScoped<INotificationService, NotificationService>();
			services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IReportService, ReportService>();
			services.AddScoped<ITeamService, TeamService>();
            services.AddScoped<ICloudflareService, CloudflareService>();
			services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<IPhotoService, PhotoService>();
			services.AddScoped<IMongoDatabaseService, MongoDatabaseService>();
			services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<IHttpClientService, HttpClientService>();
			services.AddScoped<IChatGptService, ChatGptService>();

			return services;
        }
    }
}
