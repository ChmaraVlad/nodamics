import { Module } from '@nestjs/common';
import { SocketRoomModule } from '../socket-room';
import { DiagramModule } from '../diagram';
import { DiagramController } from './diagram.controller';
import { ExecutionGraphModule } from '../execution-graph';
import { DiagramGateway } from './diagram.gateway';
import { DiagramEditorService } from './diagram-editor.service';
import { ProjectModule } from '../project';
import { DiagramEditorRepository } from './diagram-editor.repository';
import { PrismaModule } from '../prisma';

@Module({
  imports: [
    PrismaModule,
    SocketRoomModule,
    DiagramModule,
    ExecutionGraphModule,
    ProjectModule,
  ],
  providers: [DiagramEditorRepository, DiagramEditorService, DiagramGateway],
  exports: [],
  controllers: [DiagramController],
})
export class DiagramEditorModule {}
