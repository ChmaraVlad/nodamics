import { PrismaService } from '../prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExecutionGraphRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get executionGraph() {
    return this.prisma.executionGridProperties;
  }

  updateProperties(params: {
    xAxisTitle?: string;
    gridColor?: string;
    isShowVerticalGridLines?: boolean;
    diagramId: string;
  }) {
    const { diagramId, ...newValues } = params;
    return this.executionGraph.upsert({
      where: { diagramId },
      update: newValues,
      create: { diagramId, ...newValues },
    });
  }

  getProperties(params: { diagramId: string }) {
    return this.executionGraph.findUnique({
      where: { diagramId: params.diagramId },
    });
  }
}
