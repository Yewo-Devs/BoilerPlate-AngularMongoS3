using API.Application.Helpers;
using API.Application.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using static API.Core.Models.Enums;

namespace API.Infrastructure.Services
{
	public class MongoDatabaseService : IMongoDatabaseService
	{
		private readonly IMongoClient _mongoClient;
		private readonly IMongoDatabase _database;

		public MongoDatabaseService()
		{
			var connectionString = Environment.GetEnvironmentVariable("MongoDB_ConnectionString");
			var databaseName = Environment.GetEnvironmentVariable("MongoDB_DatabaseName");

			_mongoClient = new MongoClient(connectionString);
			_database = _mongoClient.GetDatabase(databaseName);

			RegisterGlobalConventions();
		}

		private void RegisterGlobalConventions()
		{
			var conventionPack = new ConventionPack
				{
					new IgnoreExtraElementsConvention(true)
				};

			ConventionRegistry.Register("IgnoreExtraElements", conventionPack, t => true);
		}

		public async Task DeleteData(DataNodes node, string path)
		{
			var collection = _database.GetCollection<BsonDocument>(node.ToString());

			if (string.IsNullOrEmpty(path))
			{
				await collection.DeleteManyAsync(Builders<BsonDocument>.Filter.Empty);
			}
			else
			{
				await collection.DeleteOneAsync(Builders<BsonDocument>.Filter.Eq("_id", path));
			}
		}

		public async Task StoreData(DataNodes node, object data, string? path = null, bool generateKey = false)
		{
			var collection = _database.GetCollection<BsonDocument>(node.ToString());
			var jsonData = GetBsonData(data);

			if (generateKey)
			{
				path ??= GenerateKey(DateTime.UtcNow);
				jsonData["_id"] = path;
			}

			if (!string.IsNullOrEmpty(path))
			{
				await collection.ReplaceOneAsync(
					Builders<BsonDocument>.Filter.Eq("_id", path),
					jsonData,
					new ReplaceOptions { IsUpsert = true }
				);
			}
			else
			{
				await collection.InsertOneAsync(jsonData);
			}
		}

		public async Task UpdateData(DataNodes node, string path, object data)
		{
			var collection = _database.GetCollection<BsonDocument>(node.ToString());
			var jsonData = GetBsonData(data);

			await collection.ReplaceOneAsync(
				Builders<BsonDocument>.Filter.Eq("_id", path),
				jsonData,
				new ReplaceOptions { IsUpsert = true }
			);
		}

		public async Task<T> GetInstanceOfType<T>(DataNodes node, string path = null)
		{
			var collection = _database.GetCollection<T>(node.ToString());
			var filter = string.IsNullOrEmpty(path)
				? Builders<T>.Filter.Empty
				: Builders<T>.Filter.Eq("_id", path);

			return await collection.Find(filter).FirstOrDefaultAsync();
		}

		public async Task<IEnumerable<T>> GetCollectionOfType<T>(DataNodes node, FilteringOptions? filteringOptions = null)
		{
			var collection = _database.GetCollection<T>(node.ToString());
			var filter = Builders<T>.Filter.Empty;

			if (filteringOptions != null)
			{
				var filters = new List<FilterDefinition<T>>();

				if (filteringOptions.StartDate.HasValue && filteringOptions.EndDate.HasValue)
				{
					filters.Add(Builders<T>.Filter.Gte("_id", filteringOptions.StartDate.Value.Ticks));
					filters.Add(Builders<T>.Filter.Lte("_id", filteringOptions.EndDate.Value.Ticks));
				}

				if (!string.IsNullOrEmpty(filteringOptions.Path))
				{
					filters.Add(Builders<T>.Filter.Eq("_id", filteringOptions.Path));
				}

				if (filters.Count > 0)
				{
					filter = Builders<T>.Filter.And(filters);
				}
			}

			return await collection.Find(filter).ToListAsync();
		}

		private BsonDocument GetBsonData(object data)
		{
			return data.ToBsonDocument(data.GetType());
		}

		private string GenerateKey(DateTime dateTime)
		{
			long ticks = dateTime.Ticks;
			return ticks.ToString();
		}
	}
}
