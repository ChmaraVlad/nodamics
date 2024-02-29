import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { PrismaModule } from '../prisma';
import { OpenAiRepository } from './openai.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OpenaiController],
  providers: [OpenaiService, OpenAiRepository],
  exports: [OpenaiService],
})
export class OpenaiModule {}
