using Amazon;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using API.Application.Interfaces;
using HeyRed.Mime;
using File = API.Core.Models.File;

namespace API.Infrastructure.Services
{
	public class StorageService : IStorageService
	{
		private readonly IPhotoService _photoService;
		private readonly IAmazonS3 _s3Client;
		private readonly string _bucketName = Environment.GetEnvironmentVariable("Aws_BucketName");

		public StorageService(IPhotoService photoService)
		{
			_photoService = photoService;

			var awsAccessKeyId = Environment.GetEnvironmentVariable("Aws_AccessKeyId");
			var awsSecretAccessKey = Environment.GetEnvironmentVariable("Aws_SecretAccessKey");
			var awsRegion = Environment.GetEnvironmentVariable("Aws_Region");

			var credentials = new BasicAWSCredentials(awsAccessKeyId, awsSecretAccessKey);
			var region = RegionEndpoint.GetBySystemName(awsRegion);

			_s3Client = new AmazonS3Client(credentials, region);
		}

		public async Task DeleteFile(string uid, string fileName)
		{
			try
			{
				var deleteObjectRequest = new DeleteObjectRequest
				{
					BucketName = _bucketName,
					Key = $"Files/{uid}/{fileName}"
				};

				await _s3Client.DeleteObjectAsync(deleteObjectRequest);
			}
			catch (Exception ex)
			{
				// Log the exception if necessary
				Exception e = ex;
			}
		}

		public string GetDownloadUrl(string objectName, TimeSpan urlDuration)
		{
			var request = new GetPreSignedUrlRequest
			{
				BucketName = _bucketName,
				Key = $"Files/{objectName}",
				Expires = DateTime.UtcNow.Add(urlDuration)
			};

			string url = _s3Client.GetPreSignedURL(request);
			return url;
		}

		public async Task<File> StoreFile(string path, string uid, string fileName)
		{
			// Get the content type from the base64 string
			int start = path.IndexOf("data:") + 5;
			int end = path.IndexOf(";");
			string contentType = path.Substring(start, end - start);

			// Remove the data URL scheme part of the string
			int n = path.IndexOf("base64,");
			path = path.Remove(0, n + 7);

			// Convert base64 string to byte array
			var bytes = Convert.FromBase64String(path);

			// Create a memory stream from the byte array
			var stream = new MemoryStream(bytes);

			fileName += GetFileExtension(contentType);

			try
			{
				var putRequest = new PutObjectRequest
				{
					BucketName = _bucketName,
					Key = $"Files/{uid}/{fileName}",
					InputStream = stream,
					ContentType = contentType
				};

				await _s3Client.PutObjectAsync(putRequest);

				// Generate the direct URL to the S3 object
				var downloadUrl = $"https://{_bucketName}.s3.amazonaws.com/Files/{uid}/{fileName}";

				return new File()
				{
					FileUrl = downloadUrl,
					FileName = fileName,
				};
			}
			catch (Exception ex)
			{
				// Log the exception if necessary
				Exception e = ex;
				return null;
			}
		}

		public async Task<string> StoreProfilePhoto(string path, string uid, string fileName)
		{
			// Crop Photo
			var bytes = await _photoService.CropPhotoAsync(path);

			var stream = new MemoryStream(bytes);

			// Get the content type from the base64 string
			int start = path.IndexOf("data:") + 5;
			int end = path.IndexOf(";");
			string contentType = path.Substring(start, end - start);

			fileName += GetFileExtension(contentType);

			try
			{
				var putRequest = new PutObjectRequest
				{
					BucketName = _bucketName,
					Key = $"Files/{uid}/{fileName}",
					InputStream = stream,
					ContentType = contentType
				};

				await _s3Client.PutObjectAsync(putRequest);

				// Generate the direct URL to the S3 object
				var downloadUrl = $"https://{_bucketName}.s3.amazonaws.com/Files/{uid}/{fileName}";
				return downloadUrl;
			}
			catch (Exception ex)
			{
				// Log the exception if necessary
				Exception e = ex;
				return null;
			}
		}

		public string GetFileExtension(string mimeType)
		{
			if (mimeType == "application/x-zip-compressed")
				return ".zip";

			return "." + MimeTypesMap.GetExtension(mimeType);
		}
	}
}
