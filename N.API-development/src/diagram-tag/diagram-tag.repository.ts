// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma';
//
// @Injectable()
// export class DiagramTagRepository {
//   constructor(private readonly prisma: PrismaService) {}
//
//   private get tag() {
//     return this.prisma.tag;
//   }
//
//   private get dashboardTag() {
//     return this.prisma.tagOfDashboard;
//   }
//
//   createTags(data: { tagNames: string[] }) {
//     const formattedTags = data.tagNames.map((tagName) => ({
//       name: tagName,
//     }));
//     return this.tag.createMany({
//       data: formattedTags,
//       skipDuplicates: true,
//     });
//   }
//
//   getTags(data: { tagNames: string[] }) {
//     return this.tag.findMany({
//       where: {
//         name: {
//           in: data.tagNames,
//         },
//       },
//     });
//   }
//
//   createTagsForDashboard(data: { tagId: string; dashboardId: string }[]) {
//     return this.dashboardTag.createMany({
//       data: data.map((tag) => ({
//         tagId: tag.tagId,
//         dashboardId: tag.dashboardId,
//       })),
//       skipDuplicates: true,
//     });
//   }
//
//   getTagsByTagIdsDashboardId(data: { tagIds: string[]; dashboardId: string }) {
//     return this.dashboardTag.findMany({
//       where: {
//         tagId: {
//           in: data.tagIds,
//         },
//         dashboardId: data.dashboardId,
//       },
//       select: {
//         id: true,
//         tag: {
//           select: {
//             name: true,
//           },
//         },
//       },
//     });
//   }
// }
