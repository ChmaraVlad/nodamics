// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma';
//
// @Injectable()
// export class DashboardRepository {
//   constructor(private readonly prisma: PrismaService) {}
//
//   get dashboard() {
//     return this.prisma.dashboard;
//   }
//
//   getDashboardByOwnerId(ownerId: string) {
//     return this.prisma.dashboard.findFirst({
//       where: {
//         ownerId,
//       },
//     });
//   }
//
//   createDashboard(ownerId: string) {
//     return this.prisma.dashboard.create({
//       data: {
//         name: 'My Dashboard',
//         ownerId,
//       },
//     });
//   }
//
//   getDashboardByDiagramId(diagramId: string) {
//     return this.prisma.dashboard.findFirst({
//       where: {
//         DiagramOfDashboard: {
//           every: {
//             diagramId,
//           },
//         },
//       },
//     });
//   }
// }
