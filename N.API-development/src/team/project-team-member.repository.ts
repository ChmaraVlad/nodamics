import { PrismaService } from '../prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectTeamMemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  get projectTeamMember() {
    return this.prisma.projectTeamMember;
  }

  deleteTeamMemberFromProjectTeam(params: { id: string }) {
    return this.projectTeamMember.delete({
      where: {
        id: params.id,
      },
    });
  }

  getTeamMemberByUserIdAndProjectId(params: {
    userId: string;
    projectId: string;
  }) {
    return this.projectTeamMember.findFirst({
      where: {
        user: {
          id: params.userId,
        },
        projectTeam: {
          project: {
            id: params.projectId,
          },
        },
      },
    });
  }
}
