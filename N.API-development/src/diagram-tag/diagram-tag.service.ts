// import { Injectable } from '@nestjs/common';
// import { DiagramTagRepository } from './diagram-tag.repository';
//
// @Injectable()
// export class DiagramTagService {
//   constructor(private readonly diagramTagRepository: DiagramTagRepository) {}
//
//   async getOrCreateTags(data: { tags: { name: string }[] }) {
//     // const tagsToCreate = data.tags
//     //   .filter((tag) => !tag.id)
//     //   .map((tag) => tag.name);
//     // const tagsWithId = data.tags.filter((tag) => tag.id);
//     await this.diagramTagRepository.createTags({
//       tagNames: data.tags.map((tag) => tag.name),
//     });
//     const newCreatedTags = await this.diagramTagRepository.getTags({
//       tagNames: data.tags.map((tag) => tag.name),
//     });
//     return newCreatedTags.map((tag) => tag.id);
//   }
//
//   async getOrCreateTagsForDashboard(data: {
//     tags: { name: string }[];
//     dashboardId: string;
//   }) {
//     const existedTags = await this.getOrCreateTags({
//       tags: data.tags,
//     });
//     const tags = existedTags.map((tagId) => ({
//       tagId,
//       dashboardId: data.dashboardId,
//     }));
//     await this.diagramTagRepository.createTagsForDashboard(tags);
//     return this.diagramTagRepository.getTagsByTagIdsDashboardId({
//       tagIds: existedTags,
//       dashboardId: data.dashboardId,
//     });
//   }
// }
