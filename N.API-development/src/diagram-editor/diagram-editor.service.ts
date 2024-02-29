import { Injectable } from '@nestjs/common';
import { DiagramService } from '../diagram';
import { ProjectService } from '../project';
import { DiagramEditorRepository } from './diagram-editor.repository';
import {
  CreateLayerWithDiagramEditorIdDto,
  CreateLayerWithDiagramIdDto,
} from './dto';

@Injectable()
export class DiagramEditorService {
  constructor(
    private readonly diagramService: DiagramService,
    private readonly projectService: ProjectService,
    private readonly diagramEditorRepository: DiagramEditorRepository,
  ) {}
  async updateDiagramElementsById(params: {
    diagramId: string;
    elements: string;
    userId: string;
  }) {
    await this.projectService.updateProjectLastModifiedAt(params);
    return this.diagramService.updateDiagramElementsById(params);
  }

  async addLayer({ diagramId, ...otherParams }: CreateLayerWithDiagramIdDto) {
    const diagramEditorSettings = await this.getOrCreateDiagramEditorSettings({
      diagramId,
    });
    return this.diagramEditorRepository.createDiagramLayers(
      new CreateLayerWithDiagramEditorIdDto({
        diagramEditorId: diagramEditorSettings.id,
        ...otherParams,
      }),
    );
  }

  private async getOrCreateDiagramEditorSettings({
    diagramId,
  }: {
    diagramId: string;
  }) {
    const diagramEditorSettings =
      await this.diagramEditorRepository.getDiagramEditorSettings({
        diagramId,
      });
    if (diagramEditorSettings) {
      return diagramEditorSettings;
    }
    return this.diagramEditorRepository.createDiagramEditorSettings({
      diagramId,
    });
  }

  async getDiagramEditorSettings({ diagramId }: { diagramId: string }) {
    return this.diagramEditorRepository.getDiagramEditorSettings({ diagramId });
  }

  async deleteLayer({ layerId }: { layerId: string }) {
    return this.diagramEditorRepository.deleteLayer({ layerId });
  }
}
