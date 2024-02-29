// import { Injectable } from '@nestjs/common';
// import { DashboardRepository } from './dashboard.repository';
//
// @Injectable()
// export class DashboardService {
//   constructor(private readonly dashboardRepository: DashboardRepository) {}
//
//   async getOrCreateDashboardByOwnerId(ownerId: string) {
//     const existingDashboard =
//       await this.dashboardRepository.getDashboardByOwnerId(ownerId);
//     if (existingDashboard) {
//       return existingDashboard;
//     }
//     return this.dashboardRepository.createDashboard(ownerId);
//   }
//
//   async getDashboardByDiagramId(diagramId: string) {
//     return this.dashboardRepository.getDashboardByDiagramId(diagramId);
//   }
// }
