import { Controller, Post } from '@nestjs/common';
import { FootprintManagerService } from './footprint-manager.service';

@Controller('footprint')
export class FootprintManagerController {
  constructor(
    private readonly footprintManagerService: FootprintManagerService,
  ) {}

  @Post('request-data')
  async requestData() {
    return await this.footprintManagerService.createNewFootprintSQLQuery();
  }
}
