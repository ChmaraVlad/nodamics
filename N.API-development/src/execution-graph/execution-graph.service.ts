import { ExecutionGraphRepository } from './execution-graph.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExecutionGraphService {
  constructor(
    private readonly executionGraphRepository: ExecutionGraphRepository,
  ) {}

  updateGridProperties(params: {
    xAxisTitle?: string;
    gridColor?: string;
    isShowVerticalGridLines?: boolean;
    diagramId: string;
  }) {
    return this.executionGraphRepository.updateProperties(params);
  }

  getProperties(params: { diagramId: string }) {
    return this.executionGraphRepository.getProperties(params);
  }
}
