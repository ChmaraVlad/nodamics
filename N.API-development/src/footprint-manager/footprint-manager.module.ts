import { Module } from '@nestjs/common';
import { FootprintIntegrationModule } from '../footprint-integration';
import { FootprintManagerService } from './footprint-manager.service';
import { FootprintManagerController } from './footprint-manager.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { FootprintManagerRepository } from './footprint-manager.repository';
import { PrismaModule } from '../prisma';
import { SocketRoomModule } from '../socket-room';
import { FootprintManagerGateway } from './footprint-manager.gateway';

@Module({
  imports: [
    PrismaModule,
    FootprintIntegrationModule,
    ScheduleModule.forRoot(),
    SocketRoomModule,
  ],
  providers: [
    FootprintManagerRepository,
    FootprintManagerService,
    FootprintManagerGateway,
  ],
  controllers: [FootprintManagerController],
})
export class FootprintManagerModule {
  constructor(
    private readonly footprintManagerService: FootprintManagerService,
  ) {}
  private async getMockQuery() {
    await this.footprintManagerService.createNewFootprintSQLQuery();
  }
  async onModuleInit() {
    await this.getMockQuery();
  }
}
