import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard, IMSession, Session } from '../auth';
import { SessionContainer } from 'supertokens-node/recipe/session';
import {
  CreateProjectDto,
  GetDiagramsByProjectIdDto,
  GetProjectInfoDto,
  GetProjectsDto,
  GetProjectTeamMembersByDiagramIdDto,
  InviteUserToProjectDto,
  ReqUpdateSpreadsheetParamsDto,
} from './dto';
import { TeamService } from '../team';
import {
  GetAllProjectResponse,
  GetProjectInfoResponseDto,
  GetProjectTeamMembersResponseDto,
} from './response-dto';
import { BadRequestError } from '../error';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  GetProjectSpreadsheetsBaseInfoDtoRequest,
  ValidateSpreadsheetResponse,
} from './dto/get-project-spreadsheets-base-info.dto';
import {
  CreateNewSpreadsheetCellDto,
  ISpreadsheetView,
  ReqUpdateSpreadsheetDto,
  SpreadsheetService,
  UpdateExistedSpreadsheetCellDto,
  UpdateSpreadsheetDto,
  UpdateSpreadsheetParamsDto,
} from '../spreadsheet';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly teamService: TeamService,
    private readonly spreadsheetService: SpreadsheetService,
  ) {}

  @Post()
  @UseGuards(new AuthGuard())
  createProject(@Session() session: IMSession, @Body() data: CreateProjectDto) {
    return this.projectService.createProject({
      creatorId: session.getAccessTokenPayload().appUserId,
      name: data.name,
    });
  }

  @Get()
  @UseGuards(new AuthGuard())
  getAllProjectsByOwner(
    @Query() query: GetProjectsDto,
  ): Promise<GetAllProjectResponse> {
    return this.projectService.getAllOwnAndTeamProjects({
      userId: query.userId,
      cursorId: query.cursorId,
    });
  }

  @Get('diagrams/:projectId')
  @UseGuards(new AuthGuard())
  getDiagramsByProjectId(
    @Session() session: SessionContainer,
    @Param() query: GetDiagramsByProjectIdDto,
  ) {
    return this.projectService.getDiagramsByProjectId({
      projectId: query.projectId,
    });
  }

  @Post('invite')
  @UseGuards(new AuthGuard())
  inviteUserToProject(@Body() body: InviteUserToProjectDto) {
    return this.teamService.inviteUserToProject(body);
  }

  @Get('/team-members')
  @UseGuards(new AuthGuard())
  async getProjectTeamMembersByDiagramId(
    @Query() query: GetProjectTeamMembersByDiagramIdDto,
  ): Promise<GetProjectTeamMembersResponseDto> {
    let teamMembers;
    if ('diagramId' in query) {
      teamMembers = await this.teamService.getProjectTeamMembers({
        diagramId: query.diagramId,
      });
    } else if ('projectId' in query) {
      teamMembers = await this.teamService.getProjectTeamMembers({
        projectId: query.projectId,
      });
    }

    if (!teamMembers) {
      throw new BadRequestError("Project doesn't has team members");
    }
    return {
      members: teamMembers.members.map((teamMember) => ({
        id: teamMember.id,
        userId: teamMember.user.id,
        firstName: teamMember.user.firstName,
        lastName: teamMember.user.lastName,
        email: teamMember.user.email,
        avatar:
          teamMember.user.avatar !== null ? teamMember.user.avatar : undefined,
      })),
    };
  }

  @Delete(':projectId')
  @UseGuards(new AuthGuard())
  deleteProject(
    @Session() session: IMSession,
    @Param('projectId') projectId: string,
  ) {
    return this.projectService.deleteProject({
      projectId: projectId,
      userId: session.getAccessTokenPayload().appUserId,
    });
  }

  @Get('info')
  @UseGuards(new AuthGuard())
  async getProjectInfo(
    @Query() query: GetProjectInfoDto,
  ): Promise<GetProjectInfoResponseDto> {
    if ('projectId' in query) {
      return this.projectService.getProjectInfo({ projectId: query.projectId });
    } else if ('diagramId' in query) {
      return this.projectService.getProjectInfo({ diagramId: query.diagramId });
    }
  }

  @Post('spreadsheet/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(new AuthGuard())
  async uploadFile(
    @Session() session: IMSession,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body:
      | { projectId: string }
      | { projectId: string; googleSpreadsheetId: string },
  ) {
    if ('googleSpreadsheetId' in body) {
      return await this.projectService.uploadGoogleSpreadsheet({
        projectId: body.projectId,
        googleSpreadsheetId: body.googleSpreadsheetId,
        userId: session.getAccessTokenPayload().appUserId,
      });
    } else if (file) {
      await this.projectService.uploadFileSpreadsheet({
        projectId: body.projectId,
        buffer: file.buffer,
      });
    } else {
      throw new BadRequestError('File and googleSpreadsheetId is not provided');
    }
  }

  @Get('spreadsheet')
  @UseGuards(new AuthGuard())
  async getSpreadsheetData(@Query() query: { spreadsheetId: string }) {
    return this.projectService.getSpreadsheetData({
      spreadsheetId: query.spreadsheetId,
    });
  }

  @Get('spreadsheets')
  @UseGuards(new AuthGuard())
  getSpreadsheets(@Query() query: { spreadsheetIds: string }) {
    const spreadsheetIds = query.spreadsheetIds.split(',');
    return this.projectService.getSpreadsheetsData({
      spreadsheetIds,
    });
  }

  @Delete('spreadsheet/:spreadsheetId')
  @UseGuards(new AuthGuard())
  deleteSpreadsheet(@Param() params: { spreadsheetId: string }) {
    return this.projectService.deleteSpreadsheet({
      spreadsheetId: params.spreadsheetId,
    });
  }

  @Get('spreadsheets/base-info')
  @UseGuards(new AuthGuard())
  async getBaseInformationSpreadsheets(
    @Query() query: GetProjectSpreadsheetsBaseInfoDtoRequest,
  ): Promise<ValidateSpreadsheetResponse> {
    const spreadsheetsInfo =
      await this.projectService.getBaseInformationSpreadsheets({
        projectId: query.projectId,
      });
    return {
      data: spreadsheetsInfo,
    };
  }

  @Put('spreadsheet')
  @UseGuards(new AuthGuard())
  updateSpreadsheet(@Body() body: ReqUpdateSpreadsheetDto) {
    const existedCells = body.existedCells.map((cell) => {
      return new UpdateExistedSpreadsheetCellDto({
        id: cell.id,
        content: cell.content,
      });
    });
    const newCells = body.newCells.map((cell) => {
      return new CreateNewSpreadsheetCellDto({
        content: cell.content,
        columnIndex: cell.columnIndex,
        rowIndex: cell.rowIndex,
      });
    });
    const spreadsheetDto = new UpdateSpreadsheetDto({
      existedCells,
      newCells,
      spreadsheetId: body.spreadsheetId,
    });
    return this.projectService.updateSpreadsheet(spreadsheetDto);
  }

  @Get(':projectId/diagrams')
  @UseGuards(new AuthGuard())
  getProjectDiagrams(
    @Query() params: { projectId: string; cursorId?: string },
  ) {
    return this.projectService.getDiagramsByProjectId({
      projectId: params.projectId,
      cursorId: params.cursorId,
    });
  }

  @Put('spreadsheet/params')
  @UseGuards(new AuthGuard())
  getSpreadsheetParams(@Body() body: ReqUpdateSpreadsheetParamsDto) {
    return this.projectService.updateSpreadsheetParams(
      new UpdateSpreadsheetParamsDto({
        spreadsheetId: body.spreadsheetId,
        name: body.name,
      }),
    );
  }

  @Post('spreadsheet/upload/body-json')
  @UseGuards(new AuthGuard())
  async uploadSpreadsheetBodyJson(
    @Body() body: { spreadsheets: ISpreadsheetView[]; projectId: string },
  ) {
    return this.spreadsheetService.uploadSpreadsheetsBodyJson(body);
  }
}
