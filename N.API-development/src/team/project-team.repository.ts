import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class ProjectTeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  get projectTeam() {
    return this.prisma.projectTeam;
  }

  async getOrCreateProjectTeam({ projectId }: { projectId: string }) {
    const projectTeam = await this.projectTeam.findFirst({
      where: { projectId },
    });
    if (projectTeam) {
      return projectTeam;
    }
    return this.projectTeam.create({
      data: {
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  }

  addUserToProject(params: { projectTeamId: string; invitedUserId: string }) {
    return this.projectTeam.update({
      where: {
        id: params.projectTeamId,
      },
      data: {
        members: {
          connectOrCreate: {
            where: {
              id: params.invitedUserId,
            },
            create: {
              user: {
                connect: {
                  id: params.invitedUserId,
                },
              },
            },
          },
        },
      },
    });
  }

  getProjectTeamMembersProjectId(params: { projectId: string }) {
    return this.projectTeam.findFirst({
      where: {
        projectId: params.projectId,
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  getProjectTeamMembersByDiagramId(params: { diagramId: string }) {
    return this.projectTeam.findFirst({
      where: {
        project: {
          diagrams: {
            some: {
              id: params.diagramId,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
}
