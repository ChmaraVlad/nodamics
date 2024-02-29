import { Injectable } from '@nestjs/common';
import { UserService } from '../user';
import { InviteUserToProjectDto } from '../project';
import { BadRequestError } from '../error';
import { ProjectTeamRepository } from './project-team.repository';
import { ProjectTeamMemberRepository } from './project-team-member.repository';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: ProjectTeamRepository,
    private readonly projectTeamMemberRepository: ProjectTeamMemberRepository,
    private readonly userService: UserService,
  ) {}

  async inviteUserToProject(params: InviteUserToProjectDto) {
    const [userToInvite, projectTeam] = await Promise.all([
      await this.userService.getUserByEmail({
        email: params.invitedUserEmail,
      }),
      await this.teamRepository.getOrCreateProjectTeam({
        projectId: params.projectId,
      }),
    ]);

    try {
      await this.teamRepository.addUserToProject({
        invitedUserId: userToInvite.id,
        projectTeamId: projectTeam.id,
      });
    } catch (e) {
      throw new BadRequestError(
        `User with email: ${userToInvite.email} was already invited `,
      );
    }
  }

  getProjectTeamMembers(params: { diagramId: string } | { projectId: string }) {
    if ('projectId' in params) {
      return this.teamRepository.getProjectTeamMembersProjectId(params);
    } else {
      return this.teamRepository.getProjectTeamMembersByDiagramId(params);
    }
  }

  deleteTeamMemberFromProjectTeam(params: { teamMemberId: string }) {
    return this.projectTeamMemberRepository.deleteTeamMemberFromProjectTeam({
      id: params.teamMemberId,
    });
  }

  async leaveProjectTeam(params: { userId: string; projectId: string }) {
    const teamMember = await this.getProjectTeamMemberByUserIdAndProjectId({
      userId: params.userId,
      projectId: params.projectId,
    });
    return this.projectTeamMemberRepository.deleteTeamMemberFromProjectTeam({
      id: teamMember.id,
    });
  }

  async getProjectTeamMemberByUserIdAndProjectId(params: {
    userId: string;
    projectId: string;
  }) {
    return this.projectTeamMemberRepository.getTeamMemberByUserIdAndProjectId({
      userId: params.userId,
      projectId: params.projectId,
    });
  }
}
