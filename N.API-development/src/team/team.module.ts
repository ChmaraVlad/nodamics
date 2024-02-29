import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { ProjectTeamRepository } from './project-team.repository';
import { PrismaModule } from '../prisma';
import { UserModule } from '../user';
import { ProjectTeamMemberRepository } from './project-team-member.repository';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [ProjectTeamRepository, ProjectTeamMemberRepository, TeamService],
  controllers: [TeamController],
  exports: [TeamService],
})
export class TeamModule {}
