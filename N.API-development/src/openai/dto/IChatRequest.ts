import OpenAI from 'openai';

export interface IChatRequest {
  projectId: string;
  userId: string;
  messages: OpenAI.Chat.ChatCompletionMessage[];
}
