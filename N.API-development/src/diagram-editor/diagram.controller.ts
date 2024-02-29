import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateDiagramDto,
  CreateLayerWithDiagramIdDto,
  UpdateExecutionGridDto,
} from './dto';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard, Session } from '../auth';
import { ExecutionGraphService } from '../execution-graph';
import { DiagramService } from '../diagram';
import { DiagramEditorService } from './diagram-editor.service';

@Controller('diagram')
export class DiagramController {
  constructor(
    private readonly diagramService: DiagramService,
    private readonly executionGraphService: ExecutionGraphService,
    private readonly diagramEditorService: DiagramEditorService,
  ) {}

  @Post('create')
  @UseGuards(new AuthGuard())
  async createDiagram(
    @Session() session: SessionContainer,
    @Body() data: CreateDiagramDto,
  ) {
    const accessTokenPayload = session.getAccessTokenPayload();
    const userId = accessTokenPayload.appUserId;
    return this.diagramService.createDiagram({
      userId: userId,
      diagramParams: data,
      projectId: data.projectId,
    });
  }

  @Put('update/execution-graph')
  @UseGuards(new AuthGuard())
  updateExecutionGrid(@Body() data: UpdateExecutionGridDto) {
    return this.executionGraphService.updateGridProperties(data);
  }

  @Get('execution-graph')
  @UseGuards(new AuthGuard())
  async getExecutionGraph(@Query() query: { diagramId: string }) {
    return this.executionGraphService.getProperties({
      diagramId: query.diagramId,
    });
  }

  @Put('layers/update')
  @UseGuards(new AuthGuard())
  updateDiagramLayers(@Body() data: CreateLayerWithDiagramIdDto) {
    return this.diagramEditorService.addLayer(data);
  }

  @Get('settings')
  @UseGuards(new AuthGuard())
  getDiagramLayers(@Query() query: { diagramId: string }) {
    return this.diagramEditorService.getDiagramEditorSettings({
      diagramId: query.diagramId,
    });
  }

  @Delete('layers/delete/:layerId')
  @UseGuards(new AuthGuard())
  deleteDiagramLayer(@Param() params: { layerId: string }) {
    console.log(params);
    return this.diagramEditorService.deleteLayer({
      layerId: params.layerId,
    });
  }
}
