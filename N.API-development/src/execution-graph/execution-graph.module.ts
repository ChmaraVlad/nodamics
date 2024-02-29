import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { ExecutionGraphService } from './execution-graph.service';
import { ExecutionGraphRepository } from './execution-graph.repository';

@Module({
  imports: [PrismaModule],
  providers: [ExecutionGraphRepository, ExecutionGraphService],
  exports: [ExecutionGraphService],
})
export class ExecutionGraphModule {}
