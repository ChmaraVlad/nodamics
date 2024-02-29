import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import OpenAI from 'openai';

import { IChatRequest, IChatResponse } from './dto';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private openaiService: OpenaiService) {}

  @Post('/chat')
  @HttpCode(200)
  async getChatOpenai(@Body() request: IChatRequest): Promise<IChatResponse> {
    const createdMesage = await this.openaiService.createMessage(request);
    // save messages in DB
    return this.openaiService.getChatOpenaiResponse(createdMesage);
  }
}
