using API.Application.Extensions;
using API.Infrastructure.Services;
using Hangfire;
using Hangfire.Mongo;
using Hangfire.Mongo.Migration.Strategies;
using Hangfire.Mongo.Migration.Strategies.Backup;
using HangfireBasicAuthenticationFilter;
using IdentityX.Application.Extensions;

namespace API
{
	public class Startup
	{
		private readonly IConfiguration _config;

		public Startup(IConfiguration config)
		{
			_config = config;
		}

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddIdentityXAuthentication(_config);
			services.AddIdentityXRoleBasedAuthorization();
			services.AddIdentityXUserManagement<EmailService, DataService>();
			services.AddIdentityXMultiFactorAuthentication();

			// Add Hangfire services with MongoDB storage and migration options.
			services.AddHangfire(config => config
				.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
				.UseSimpleAssemblyNameTypeSerializer()
				.UseRecommendedSerializerSettings()
				.UseMongoStorage(Environment.GetEnvironmentVariable("MongoDB_ConnectionString"),
				"hangfire", new MongoStorageOptions
				{
					MigrationOptions = new MongoMigrationOptions
					{
						MigrationStrategy = new MigrateMongoMigrationStrategy(),
						BackupStrategy = new CollectionMongoBackupStrategy()
					}
				})
			);

			// Add Hangfire server as a background job.
			services.AddHangfireServer(options =>
			{
				options.WorkerCount = 1; // Limit workers to 1 to prevent multiple executions
			});

			services.AddApplicationServices(_config);

			services.AddControllers();
			services.AddCors();
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment() || env.IsStaging())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseRouting();
			app.UseHsts();
			app.UseHttpsRedirection();
			app.UseCors(x => x.AllowAnyMethod()
				.AllowAnyHeader()
				.SetIsOriginAllowed(origin => true)
				.AllowCredentials());
			app.UseAuthentication();
			app.UseAuthorization();

			// Use Hangfire dashboard (for monitoring).
			app.UseHangfireDashboard("/background-events", new DashboardOptions()
			{
				DashboardTitle = "Background Events Dashboard",
				DisplayStorageConnectionString = false,
				Authorization = new[]
				{
					new HangfireCustomBasicAuthenticationFilter
					{
						User = Environment.GetEnvironmentVariable("Hangfire_User"),
						Pass = Environment.GetEnvironmentVariable("Hangfire_Password")
					}
				}
			});

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}