using API.Application.Interfaces;
using IdentityX.Application.Interfaces;
using static API.Core.Models.Enums;

namespace API.Infrastructure.Services
{
	public class DataService: IDataService
	{
		private readonly IMongoDatabaseService _mongoDatabaseService;

		public DataService(IMongoDatabaseService mongoDatabaseService)
		{
			_mongoDatabaseService = mongoDatabaseService;
		}

		#region IdentityX Implementations
		public async Task DeleteData(string collection, string id)
		{
			DataNodes node = (DataNodes)Enum.Parse(typeof(DataNodes), collection);

			await _mongoDatabaseService.DeleteData(node, id);
		}

		public async Task<IEnumerable<T>> GetCollectionOfType<T>(string collection)
		{
			DataNodes node = (DataNodes)Enum.Parse(typeof(DataNodes), collection);

			return await _mongoDatabaseService.GetCollectionOfType<T>(node);
		}

		public async Task<T> GetInstanceOfType<T>(string collection, string id)
		{
			DataNodes node = (DataNodes)Enum.Parse(typeof(DataNodes), collection);

			return await _mongoDatabaseService.GetInstanceOfType<T>(node, id);
		}

		public async Task StoreData(string collection, object data, string id)
		{
			DataNodes node = (DataNodes)Enum.Parse(typeof(DataNodes), collection);

			await _mongoDatabaseService.StoreData(node, data, id);
		}

		public async Task UpdateData(string collection, string path, object data)
		{
			DataNodes node = (DataNodes)Enum.Parse(typeof(DataNodes), collection);

			await _mongoDatabaseService.UpdateData(node, path, data);
		}
		#endregion
	}
}
