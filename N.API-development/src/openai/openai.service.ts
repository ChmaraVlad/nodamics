import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

import { IChatRequest, IChatResponse } from './dto';
import { OpenAiRepository } from './openai.repository';

@Injectable()
export class OpenaiService {
  private openAiService: OpenAI;

  constructor(
    private configService: ConfigService,
    private openAiRepository: OpenAiRepository,
  ) {
    this.openAiService = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async createMessage(request: IChatRequest): Promise<{
    request: IChatRequest;
    data: OpenAI.ChatCompletion;
  }> {
    // save message from user
    await this.saveMessage(request);

    const message = await this.openAiService.chat.completions.create({
      model: this.configService.get('OPENAI_API_MODEL'),
      messages: request.messages,
    });

    return {
      request,
      data: message,
    };
  }

  async saveMessage(request: IChatRequest) {
    await this.openAiRepository?.saveMessage({
      role: request.messages[0].role,
      content: request.messages[0].content,
      userId: request.userId,
      projectId: request.projectId,
    });
  }

  async getChatOpenaiResponse({
    request,
    data,
  }: {
    request: IChatRequest;
    data: OpenAI.ChatCompletion;
  }): Promise<IChatResponse> {
    if (data?.choices?.length) {
      await this.saveMessage({
        content: data?.choices?.length && data?.choices[0]?.message?.content,
        role: data?.choices[0]?.message?.role,
        ...data?.choices[0]?.message,
        ...request,
      });

      return {
        success: true,
        result: data?.choices?.length && data?.choices[0],
      };
    }
  }
}
