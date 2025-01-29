using API.Application.Interfaces;
using Hangfire;

namespace API.Infrastructure.Services
{
    public class SchedulerService: ISchedulerService
    {
		private readonly IBackgroundJobClient _backgroundJobClient;
        
        public SchedulerService(IBackgroundJobClient backgroundJobClient)
        {
            _backgroundJobClient = backgroundJobClient;
        }

		public void ScheduleTask<T>(System.Linq.Expressions.Expression<Action<T>> action, DateTime dateTime)
        {
			DateTimeOffset dateTimeOffset = new DateTimeOffset(dateTime);

			_backgroundJobClient.Schedule<T>(action, dateTimeOffset);
		}
	}
}
