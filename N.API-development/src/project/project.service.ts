import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './projectRepository';
import { BadRequestError } from '../error';
import {
  SpreadsheetService,
  UpdateSpreadsheetDto,
  UpdateSpreadsheetParamsDto,
} from '../spreadsheet';
import { GoogleApisService } from '../google-apis';
import { BufferHelper } from '../utils';
import { DiagramService } from '../diagram';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly spreadsheetService: SpreadsheetService,
    private readonly googleApisService: GoogleApisService,
    private readonly diagramService: DiagramService,
  ) {}

  async createProject(params: { creatorId: string; name: string }) {
    return this.projectRepository.createProject(params);
  }

  getAllProjectsByOwner(params: { ownerId: string; cursorId?: string }) {
    return this.projectRepository.getAllProjectsByOwner({
      ownerId: params.ownerId,
      cursor: params.cursorId ? { id: params.cursorId } : undefined,
    });
  }

  getAllOwnAndTeamProjects(params: { userId: string; cursorId?: string }) {
    return this.projectRepository.getAllOwnAndTeamProjects({
      userId: params.userId,
      cursor: params.cursorId ? { id: params.cursorId } : undefined,
    });
  }

  async getDiagramsByProjectId(params: {
    projectId: string;
    cursorId?: string;
  }) {
    const diagrams = await this.diagramService.getDiagramsByProjectId(params);
    return {
      diagrams: diagrams,
      id: params.projectId,
    };
  }

  async deleteProject(params: { projectId: string; userId: string }) {
    const { projectId, userId } = params;
    const project = await this.projectRepository.getProjectById(projectId);
    if (project.creatorId !== userId) {
      throw new BadRequestError(
        'Only the creator of the project can delete it',
      );
    }
    return this.projectRepository.deleteProject(projectId);
  }

  getProjectInfo(params: { projectId: string } | { diagramId: string }) {
    return this.projectRepository.getProjectInfo(params);
  }

  async uploadFileSpreadsheet(params: { projectId: string; buffer: Buffer }) {
    const workbook = this.spreadsheetService.parseSpreadsheet(params.buffer);
    const datasetName = this.spreadsheetService.getDatasetNameFromSpreadsheet({
      spreadSheet: workbook,
    });
    await this.spreadsheetService.storeSpreadsheetData({
      projectId: params.projectId,
      data: workbook,
      spreadsheetName: datasetName,
    });
    return workbook;
  }

  async uploadGoogleSpreadsheet(params: {
    projectId: string;
    googleSpreadsheetId: string;
    userId: string;
  }) {
    const spreadsheetData = await this.googleApisService.getSpreadSheetById({
      spreadsheetId: params.googleSpreadsheetId,
      userId: params.userId,
    });
    const buffer = await BufferHelper.streamToBuffer(spreadsheetData.data);
    return await this.uploadFileSpreadsheet({
      projectId: params.projectId,
      buffer: buffer,
    });
  }

  getSpreadsheetData(params: { spreadsheetId: string }) {
    return this.spreadsheetService.getSpreadsheetData(params);
  }
  getSpreadsheetsData(params: { spreadsheetIds: string[] }) {
    return this.spreadsheetService.getSpreadsheetsData(params);
  }

  deleteSpreadsheet(params: { spreadsheetId: string }) {
    return this.spreadsheetService.deleteSpreadsheet(params);
  }

  getBaseInformationSpreadsheets(params: { projectId: string }) {
    return this.spreadsheetService.getSpreadsheetsByProjectId(params);
  }

  updateSpreadsheet(updateSpreadsheetDto: UpdateSpreadsheetDto) {
    return this.spreadsheetService.updateSpreadsheet(updateSpreadsheetDto);
  }

  updateSpreadsheetParams(data: UpdateSpreadsheetParamsDto) {
    return this.spreadsheetService.updateSpreadsheetParams(data);
  }

  updateProjectLastModifiedAt(params: { diagramId: string; userId: string }) {
    return this.projectRepository.updateProjectLastModifiedAt(params);
  }
}
