import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { CreateLayerWithDiagramEditorIdDto } from './dto';

@Injectable()
export class DiagramEditorRepository {
  constructor(private readonly prisma: PrismaService) {}

  createDiagramEditorSettings(params: { diagramId: string }) {
    return this.prisma.diagramEditorSettings.create({
      data: {
        diagramId: params.diagramId,
      },
    });
  }

  getDiagramEditorSettings(params: { diagramId: string }) {
    return this.prisma.diagramEditorSettings.findUnique({
      where: {
        diagramId: params.diagramId,
      },
      include: {
        DiagramLayers: true,
      },
    });
  }

  createDiagramLayers(params: CreateLayerWithDiagramEditorIdDto) {
    return this.prisma.diagramLayers.create({
      data: {
        diagramEditorSettingsId: params.diagramEditorId,
        name: params.layerName,
        visible: params.visible,
        isSelected: params.isSelected,
      },
    });
  }

  deleteLayer(params: { layerId: string }) {
    return this.prisma.diagramLayers.delete({
      where: {
        id: params.layerId,
      },
    });
  }
}
