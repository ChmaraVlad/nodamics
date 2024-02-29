import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaModule } from '../prisma';
import { ProjectRepository } from './projectRepository';
import { TeamModule } from '../team';
import { SpreadsheetModule } from '../spreadsheet';
import { UserModule } from '../user';
import { GoogleApisModule } from '../google-apis';
import { DiagramModule } from '../diagram/diagram.module';

@Module({
  imports: [
    PrismaModule,
    TeamModule,
    SpreadsheetModule,
    UserModule,
    GoogleApisModule,
    DiagramModule,
  ],
  providers: [ProjectRepository, ProjectService],
  exports: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
