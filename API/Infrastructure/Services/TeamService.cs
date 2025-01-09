using API.Application.DTO;
using API.Application.Interfaces;
using API.Core.Entities;
using API.Core.Models;
using IdentityX.Application.Extensions;
using static API.Core.Models.Enums;

namespace API.Infrastructure.Services
{
	public class TeamService : ITeamService
	{
		private readonly IMongoDatabaseService _mongoDatabaseService;
		private readonly IEmailService _emailService;
		private readonly IStorageService _storageService;

		public TeamService(IMongoDatabaseService mongoDatabaseService, IEmailService emailService, IStorageService storageService)
		{
			_mongoDatabaseService = mongoDatabaseService;
			_emailService = emailService;
			_storageService = storageService;
		}

		public async Task AcceptInvite(string teamId, string inviteId, string userId)
		{
			var team = await _mongoDatabaseService.GetInstanceOfType<TeamDto>(DataNodes.Team, teamId);
			var invite = team.Invites.FirstOrDefault(i => i.Id == inviteId);

			if (invite == null || invite.Revoked)
			{
				throw new InvalidOperationException("Invalid invite.");
			}

			if (invite.Accepted)
				return;

			invite.Accepted = true;
			invite.UpdatedAt = DateTime.UtcNow;

			if(team.Members == null)
				team.Members = new List<TeamMember>();

			//Add Member to Team
			team.Members.Add(new TeamMember
			{
				UserId = userId,
				Role = invite.Role
			});

			await _mongoDatabaseService.UpdateData(DataNodes.Team, teamId, team);
		}

		public async Task CreateInvitation(CreateInvitationDto createInvitationDto)
		{
			TeamDto team = await GetTeamByIdAsync(createInvitationDto.TeamId);

			if (team == null)
			{
				throw new InvalidOperationException("Team not found.");
			}

			if(team.Invites == null)
				team.Invites = new List<TeamInvite>();

			var teamInvite = new TeamInvite
			{
				Id = Guid.NewGuid().ToString(),
				Email = createInvitationDto.Email,
				Role = createInvitationDto.Role,
				Accepted = false,
				Revoked = false,
				CreatedAt = DateTime.UtcNow,
				UpdatedAt = DateTime.UtcNow
			};

			team.Invites.Add(teamInvite);

			await _emailService.SendTeamInvitation(team, teamInvite.Id, createInvitationDto);

			await _mongoDatabaseService.UpdateData(DataNodes.Team, team.Id, team);
		}

		public async Task<TeamDto> CreateTeamAsync(CreateTeamDto createTeamDto)
		{
			var team = new Team
			{
				Id = Guid.NewGuid().ToString(),
				Name = createTeamDto.Name,
				Members = createTeamDto.Members,
				Invites = createTeamDto.Invites,
				TeamPhotoUrl = await StorePhoto(createTeamDto.TeamPhotoUrl)
			};

			await _mongoDatabaseService.StoreData(DataNodes.Team, team, team.Id);

			return team.Map<TeamDto>();
		}

		private async Task<string> StorePhoto(string photoUrl)
		{
			//If is not base64 string return photoUrl
			if (!photoUrl.Contains("base64"))
			{
				return photoUrl;
			}

			return await _storageService
				.StoreProfilePhoto(photoUrl, Guid.NewGuid().ToString(), "teamPhotoUrl");
		}

		public async Task DeleteTeamAsync(string id)
		{
			await _mongoDatabaseService.DeleteData(DataNodes.Team, id);
		}

		public async Task<IEnumerable<TeamDto>> GetAllUserTeamsAsync(string userId)
		{
			var teams = await _mongoDatabaseService.GetCollectionOfType<TeamDto>(DataNodes.Team);

			return teams.Where(t => t.Members.Any(m => m.UserId == userId));
		}

		public async Task<TeamDto> GetTeamByIdAsync(string id)
		{
			return await _mongoDatabaseService.GetInstanceOfType<TeamDto>(DataNodes.Team, id);
		}

		public async Task UpdateTeamAsync(UpdateTeamDto updateTeamDto)
		{
			var team = await _mongoDatabaseService.GetInstanceOfType<Team>(DataNodes.Team, updateTeamDto.Id);

			if (team == null)
			{
				throw new InvalidOperationException("Team not found.");
			}

			team.Name = updateTeamDto.Name;
			team.Members = updateTeamDto.Members;
			team.Invites = updateTeamDto.Invites;

			await _mongoDatabaseService.UpdateData(DataNodes.Team, updateTeamDto.Id, team);
		}
	}
}
