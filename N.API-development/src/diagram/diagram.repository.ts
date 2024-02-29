import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class DiagramRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get diagram() {
    return this.prisma.diagram;
  }

  createDiagram(data: {
    userId: string;
    diagramName: string;
    elements?: JSON;
    projectId: string;
  }) {
    return this.diagram.create({
      data: {
        creator: {
          connect: {
            id: data.userId,
          },
        },
        lastEditor: {
          connect: {
            id: data.userId,
          },
        },
        project: {
          connect: {
            id: data.projectId,
          },
        },
        name: data.diagramName,
        elements: JSON.stringify(data.elements),
      },
    });
  }

  getDiagramById(diagramId: string) {
    return this.diagram.findUnique({
      where: {
        id: diagramId,
      },
      select: {
        id: true,
        name: true,
        elements: true,
      },
    });
  }

  updateDiagramElementsById({
    diagramId,
    elements,
    userId,
  }: {
    diagramId: string;
    elements: string;
    userId: string;
  }) {
    return this.diagram.update({
      where: {
        id: diagramId,
      },
      data: {
        elements: elements,
        lastEditor: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  getDiagramsByProjectId(params: {
    projectId: string;
    cursor?: { id: string };
  }) {
    return this.diagram.findMany({
      where: {
        projectId: params.projectId,
      },
      skip: params.cursor ? 1 : undefined,
      take: 20,
      cursor: params.cursor ? { id: params.cursor.id } : undefined,
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        name: true,
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

  // updateDiagramById(data: {
  //   diagramId: string;
  //   diagramName?: string;
  //   diagramDescription?: string;
  //   dashboardTagIds?: string[];
  // }) {
  //   return this.diagram.update({
  //     where: {
  //       id: data.diagramId,
  //     },
  //     data: {
  //       name: data.diagramName,
  //     },
  //   });
  // }
}
