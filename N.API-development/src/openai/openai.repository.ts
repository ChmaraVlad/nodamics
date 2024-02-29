import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';

@Injectable()
export class OpenAiRepository {
  constructor(private readonly prisma: PrismaService) {}

  get aiHelper() {
    return this.prisma.aiHelper;
  }
  get aiHelperMessage() {
    return this.prisma.aiHelperMessage;
  }
  get user() {
    return this.prisma.user;
  }
  get project() {
    return this.prisma.project;
  }

  // async getOrCreateProjectTeam({ projectId }: { projectId: string }) {
  //   const projectTeam = await this.projectTeam.findFirst({
  //     where: { projectId },
  //   });
  //   if (projectTeam) {
  //     return projectTeam;
  //   }
  //   return this.projectTeam.create({
  //     data: {
  //       project: {
  //         connect: {
  //           id: projectId,
  //         },
  //       },
  //     },
  //   });
  // }

  // need to be updated logic
  saveMessage(params: {
    role: string;
    content: string;
    userId: string;
    projectId: string;
  }) {
    const user = this.user.findUnique({ where: { id: params.userId } });
    const newMessage = this.aiHelper.create({
      data: {
        role: params.role,
        content: params.content,
        userId: params.userId,
        projectId: params.projectId,
      },
    });
    // const correctUser = this.user.findUnique({ where: { id: params.userId } });
    //   return this.aiHelper.update({
    //     where: {
    //       id: params.userId,
    //     },
    //     data: {
    //       messages: [
    //         {
    //           message: params.content,
    //           role: params.role,
    //           userId: params.userId,
    //           projectId: params.projectId,
    //         },
    //       ],
    //       role: params.role,
    //     },
    //   });
  }

  // getProjectTeamMembersProjectId(params: { projectId: string }) {
  //   return this.projectTeam.findFirst({
  //     where: {
  //       projectId: params.projectId,
  //     },
  //     include: {
  //       members: {
  //         include: {
  //           user: {
  //             select: {
  //               id: true,
  //               firstName: true,
  //               lastName: true,
  //               avatar: true,
  //               email: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  // need to be updated logic
  // getMessagesHistoryByUserId() {
  //   return 'test';
  //   // return this.AiHelper;
  // }

  // need to be updated logic
  // geAllAiHelpers() {
  //   return this.aiHelper.findMany();
  // }
}
