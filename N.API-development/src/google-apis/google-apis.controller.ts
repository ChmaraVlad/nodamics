import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GoogleApisService } from './google-apis.service';
import { UserService } from '../user';
import { ConfigService } from '@nestjs/config';

@Controller('google')
export class GoogleApisController {
  constructor(
    private readonly userService: UserService,
    private readonly googleApisService: GoogleApisService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login')
  login(@Res() res: Response, @Query() query: { userId: string }) {
    const authUrl = this.googleApisService.getAuthUrlToConnectUserToGoogle({
      userId: query.userId,
    });
    res.redirect(authUrl);
  }

  @Get('callback')
  async callback(
    @Query() query: { code: string; state: string },
    @Res() res: Response,
  ) {
    const userId = JSON.parse(query.state).appUserId;
    const token = await this.googleApisService.decodeAuthCode({
      code: query.code,
    });

    await this.userService.setUserGoogleCredentials({
      userId: userId,
      googleUserId: token.id_token,
      googleAccessToken: token.access_token,
      googleAuthRefreshToken: token.refresh_token,
    });

    const websiteUrl: string = this.configService.get<string>('WEBSITE_URL');
    const script = `
      <script>
        window.opener.postMessage({ status: 'ok' }, '${websiteUrl}');
        window.close();
      </script>
    `;
    res.send(script);
  }
}
