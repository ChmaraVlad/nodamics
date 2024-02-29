import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  get project() {
    return this.prisma.project;
  }

  createProject(params: { name: string; creatorId: string }) {
    return this.project.create({
      data: {
        name: params.name,
        creator: {
          connect: {
            id: params.creatorId,
          },
        },
        lastEditor: {
          connect: {
            id: params.creatorId,
          },
        },
      },
    });
  }

  getAllProjectsByOwner(params: {
    ownerId: string;
    cursor?: { id: string };
    take?: number;
  }) {
    return this.project.findMany({
      where: {
        creatorId: params.ownerId,
      },
      skip: params.cursor ? 1 : undefined,
      take: params.take || 15,
      cursor: params.cursor ? { id: params.cursor.id } : undefined,
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        name: true,
        id: true,
        updatedAt: true,
        createdAt: true,
        creator: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
          },
        },
        lastEditor: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
          },
        },
      },
    });
  }

  getDiagramsByProjectId(params: {
    projectId: string;
    cursor?: { id: string };
  }) {
    return this.project.findMany({
      where: {
        id: params.projectId,
      },
      select: {
        id: true,
        diagrams: {
          select: {
            id: true,
            name: true,
            updatedAt: true,
            createdAt: true,
          },
        },
      },
    });
  }

  getProjectById(projectId: string) {
    return this.project.findUnique({
      where: {
        id: projectId,
      },
    });
  }

  getAllOwnAndTeamProjects(params: {
    userId: string;
    cursor?: { id: string };
  }) {
    return this.project.findMany({
      where: {
        OR: [
          {
            creatorId: params.userId,
          },
          {
            projectTeams: {
              some: {
                members: {
                  some: {
                    userId: params.userId,
                  },
                },
              },
            },
          },
        ],
      },
      skip: params.cursor ? 1 : undefined,
      take: 15,
      cursor: params.cursor ? { id: params.cursor.id } : undefined,
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        name: true,
        id: true,
        updatedAt: true,
        createdAt: true,
        creator: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
          },
        },
        lastEditor: {
          select: {
            firstName: true,
            lastName: true,
            id: true,
          },
        },
      },
    });
  }

  deleteProject(projectId: string) {
    return this.project.delete({
      where: {
        id: projectId,
      },
    });
  }

  getProjectInfo(params: { projectId: string } | { diagramId: string }) {
    const select = {
      name: true,
      id: true,
      updatedAt: true,
      createdAt: true,
      creator: {
        select: {
          firstName: true,
          lastName: true,
          id: true,
        },
      },
      lastEditor: {
        select: {
          firstName: true,
          lastName: true,
          id: true,
        },
      },
    };
    if ('diagramId' in params) {
      return this.project.findFirst({
        where: {
          diagrams: {
            some: {
              id: params.diagramId,
            },
          },
        },
        select: select,
      });
    } else if ('projectId' in params) {
      return this.project.findUnique({
        where: {
          id: params.projectId,
        },
        select: select,
      });
    }
  }

  updateProjectLastModifiedAt(params: { diagramId: string; userId: string }) {
    return this.project.updateMany({
      where: {
        diagrams: {
          some: {
            id: params.diagramId,
          },
        },
      },
      data: {
        lastEditorId: params.userId,
      },
    });
  }
}
