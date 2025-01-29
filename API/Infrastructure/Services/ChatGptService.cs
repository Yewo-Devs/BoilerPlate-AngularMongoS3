using API.Application.Interfaces;
using OpenAI;
using OpenAI.Files;
using OpenAI.Assistants;
using OpenAI.Chat;
using System.Text;

namespace API.Infrastructure.Services
{
	public class ChatGptService : IChatGptService
	{
		private readonly string OpenAiApiKey = Environment.GetEnvironmentVariable("OpenAi_ApiKey");
		private readonly OpenAIClient _chatGpt;
		private readonly ChatClient _chatClient;
		private readonly OpenAIFileClient _fileClient;
		private readonly AssistantClient _assistantClient;
		private readonly HttpClient _httpClient;

		public ChatGptService()
		{
			_chatGpt = new OpenAIClient(OpenAiApiKey);
			_fileClient = _chatGpt.GetOpenAIFileClient();
			_chatClient = _chatGpt.GetChatClient("gpt-4o");
			_assistantClient = _chatGpt.GetAssistantClient();
			_httpClient = new HttpClient();
		}

		public async Task<string> Prompt(string prompt)
		{
			ChatCompletion completion = await _chatClient.CompleteChatAsync(prompt);

			return completion.Content[0].Text;
		}

		public async Task<string> PromptWithAttachments(string prompt, Core.Models.File[] files = null)
		{
			List<string> fileIds = new List<string>();

			if (files != null && files.Any())
			{
				foreach (var file in files)
				{
					var fileId = await UploadFileFromUrlAsync(file.FileUrl, file.FileName);
					fileIds.Add(fileId);
				}
			}

			var assistant = await CreateAssistantAsync(fileIds);
			var threadRun = await CreateThreadAndRunAsync(assistant.Id, prompt);

			// Check back to see when the run is done
			do
			{
				Thread.Sleep(TimeSpan.FromSeconds(1));
				threadRun = await _assistantClient.GetRunAsync(threadRun.ThreadId, threadRun.Id);
			} while (!threadRun.Status.IsTerminal);

			var allMessages = await RetrieveMessagesAsync(threadRun.ThreadId);

			return allMessages;
		}

		private async Task<string> UploadFileFromUrlAsync(string fileUrl, string fileName)
		{
			using var response = await _httpClient.GetAsync(fileUrl);
			response.EnsureSuccessStatusCode();

			using var fileStream = await response.Content.ReadAsStreamAsync();

			var fileResponse = await _fileClient.UploadFileAsync(fileStream, fileName, FileUploadPurpose.Assistants);
			return fileResponse.Value.Id;
		}

		private async Task<Assistant> CreateAssistantAsync(List<string> fileIds)
		{
			var assistantCreationOptions = new AssistantCreationOptions
			{
				Name = "File question answerer",
				Instructions = "Answer questions from the user about the provided file.",
				Tools = { new FileSearchToolDefinition(), new CodeInterpreterToolDefinition() },
				ToolResources = new ToolResources
				{
					FileSearch = new FileSearchToolResources
					{
						NewVectorStores = { new VectorStoreCreationHelper(fileIds) }
					}
				}
			};

			var assistant = await _assistantClient.CreateAssistantAsync("gpt-4o", assistantCreationOptions);
			return assistant;
		}

		private async Task<ThreadRun> CreateThreadAndRunAsync(string assistantId, string initialMessage)
		{
			var threadCreationOptions = new ThreadCreationOptions
			{
				InitialMessages = { initialMessage }
			};

			var threadRun = await _assistantClient.CreateThreadAndRunAsync(assistantId, threadCreationOptions);
			return threadRun;
		}

		private async Task<string> RetrieveMessagesAsync(string threadId)
		{
			var messages = _assistantClient.GetMessagesAsync(threadId, new MessageCollectionOptions { Order = MessageCollectionOrder.Ascending });

			var result = new StringBuilder();

			await foreach (var message in messages)
			{
				if(message.Role != MessageRole.User)
				{
					foreach (var contentItem in message.Content)
					{
						if (!string.IsNullOrEmpty(contentItem.Text))
						{
							result.AppendLine(contentItem.Text);

							if (contentItem.TextAnnotations.Count > 0)
							{
								result.AppendLine();
							}

							// Include annotations, if any.
							foreach (var annotation in contentItem.TextAnnotations)
							{
								if (!string.IsNullOrEmpty(annotation.InputFileId))
								{
									result.AppendLine($"* File citation, file ID: {annotation.InputFileId}");
								}
								if (!string.IsNullOrEmpty(annotation.OutputFileId))
								{
									result.AppendLine($"* File output, new file ID: {annotation.OutputFileId}");
								}
							}
						}
					}
					result.AppendLine();
				}
			}

			return result.ToString();
		}
	}
}