import { Module } from '@nestjs/common';
import { GoogleApisService } from './google-apis.service';
import { ConfigGoogleApisInjectionToken } from './forRootAsync.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user';
import { GoogleApisController } from './google-apis.controller';

@Module({
  imports: [ConfigModule, UserModule],
  providers: [
    {
      provide: ConfigGoogleApisInjectionToken,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
        clientId: configService.get('GOOGLE_CLIENT_ID'),
      }),
    },
    GoogleApisService,
  ],
  exports: [GoogleApisService],
  controllers: [GoogleApisController],
})
export class GoogleApisModule {}
