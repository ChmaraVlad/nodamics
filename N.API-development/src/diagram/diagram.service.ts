import { DiagramRepository } from './diagram.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiagramService {
  constructor(private readonly diagramRepository: DiagramRepository) {}

  async createDiagram({
    diagramParams,
    userId,
    projectId,
  }: {
    userId: string;
    diagramParams: {
      diagramName: string;
      projectId: string;
      elements?: JSON;
    };
    projectId: string;
  }) {
    return await this.diagramRepository.createDiagram({
      projectId,
      userId,
      diagramName: diagramParams.diagramName,
      elements: diagramParams.elements,
    });
  }

  getDiagramById(diagramId: string) {
    return this.diagramRepository.getDiagramById(diagramId);
  }

  updateDiagramElementsById(params: {
    diagramId: string;
    elements: string;
    userId: string;
  }) {
    return this.diagramRepository.updateDiagramElementsById(params);
  }

  getDiagramsByProjectId(params: { projectId: string; cursorId?: string }) {
    return this.diagramRepository.getDiagramsByProjectId({
      projectId: params.projectId,
      cursor: params.cursorId ? { id: params.cursorId } : undefined,
    });
  }

  //
  // async updateDiagramById({
  //   diagramParams,
  // }: {
  //   diagramParams: UpdateDiagramDto;
  // }) {
  //   let tagToDiagram: string[] = [];
  //   if (diagramParams.diagramTags && diagramParams.diagramTags.length !== 0) {
  //     const dashboard = await this.dashboardService.getDashboardByDiagramId(
  //       diagramParams.diagramId,
  //     );
  //     const tagsToCreate = diagramParams.diagramTags.filter((tag) => !tag.id);
  //     const dashboardTagIds =
  //       await this.diagramTagService.getOrCreateTagsForDashboard({
  //         tags: tagsToCreate,
  //         dashboardId: dashboard.id,
  //       });
  //     tagToDiagram = dashboardTagIds.map((tag) => tag.id);
  //   }
  //   return this.diagramRepository.updateDiagramById({
  //     diagramId: diagramParams.diagramId,
  //     diagramName: diagramParams.diagramName,
  //     diagramDescription: diagramParams.diagramDescription,
  //     dashboardTagIds: tagToDiagram,
  //   });
  // }
  //
  // async getDiagramsByUserId(userId: string) {
  //   const dashboard = await this.dashboardService.getOrCreateDashboardByOwnerId(
  //     userId,
  //   );
  //   const diagrams = await this.diagramRepository.getDiagramsByDashboardId(
  //     dashboard.id,
  //   );
  //   return {
  //     dashboard: dashboard,
  //     diagrams: diagrams,
  //   };
  // }
  //
  // async deleteDiagramById(diagramId: string) {
  //   return this.diagramRepository.deleteDiagramById(diagramId);
  // }
}
