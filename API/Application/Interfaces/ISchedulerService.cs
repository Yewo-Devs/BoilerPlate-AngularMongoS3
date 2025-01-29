namespace API.Application.Interfaces
{
    public interface ISchedulerService
    {
        void ScheduleTask<T>(System.Linq.Expressions.Expression<Action<T>> action, DateTime dateTime);
	}
}
