import { SpreadsheetService } from './spreadsheet.service';
import {
  Body,
  Controller,
  Get,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard, IMSession, Session } from '../auth';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('spreadsheet')
export class SpreadsheetController {
  constructor(private readonly spreadsheetService: SpreadsheetService) {}

  @Get('google-spreadsheets')
  @UseGuards(new AuthGuard())
  getAllGoogleSpreadsheets(@Session() session: IMSession) {
    const userId = session.getAccessTokenPayload().appUserId;
    return this.spreadsheetService.getAllGoogleSpreadsheets({ userId });
  }

  @Put('rewrite')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(new AuthGuard())
  rewriteSpreadsheet(
    @Session() session: IMSession,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: { spreadsheetId: string },
  ) {
    return this.spreadsheetService.rewriteSpreadsheet({
      spreadsheetId: body.spreadsheetId,
      buffer: file.buffer,
    });
  }
}
