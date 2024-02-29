import { Module } from '@nestjs/common';
import { DiagramService } from './diagram.service';
import { PrismaModule } from '../prisma';
import { DiagramRepository } from './diagram.repository';

@Module({
  imports: [PrismaModule],
  providers: [DiagramRepository, DiagramService],
  exports: [DiagramService],
})
export class DiagramModule {}
