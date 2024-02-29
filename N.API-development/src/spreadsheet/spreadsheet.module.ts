import { Module } from '@nestjs/common';
import { SpreadsheetRepository } from './spreadsheet.repository';
import { PrismaModule } from '../prisma';
import { SpreadsheetService } from './spreadsheet.service';
import { GoogleApisModule } from '../google-apis';
import { UserModule } from '../user';
import { SpreadsheetController } from './spreadsheet.controller';

@Module({
  imports: [PrismaModule, GoogleApisModule, UserModule],
  providers: [SpreadsheetRepository, SpreadsheetService],
  exports: [SpreadsheetService],
  controllers: [SpreadsheetController],
})
export class SpreadsheetModule {}
