import { Body, Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { DeleteTeamMemberFromProjectTeamDto, LeaveProjectDto } from './dto';
import { AuthGuard, Session, IMSession } from '../auth';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Delete('member/:teamMemberId')
  @UseGuards(new AuthGuard())
  deleteTeamMemberFromProjectTeam(
    @Param() params: DeleteTeamMemberFromProjectTeamDto,
  ) {
    return this.teamService.deleteTeamMemberFromProjectTeam({
      teamMemberId: params.teamMemberId,
    });
  }

  @Delete('leave')
  @UseGuards(new AuthGuard())
  leaveProjectTeam(
    @Session() session: IMSession,
    @Body() body: LeaveProjectDto,
  ) {
    return this.teamService.leaveProjectTeam({
      userId: session.getAccessTokenPayload().appUserId,
      projectId: body.projectId,
    });
  }
}
