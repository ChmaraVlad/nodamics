import { Inject, Injectable } from '@nestjs/common';

import {
  AuthModuleConfig,
  ConfigGoogleApisInjectionToken,
} from './forRootAsync.interface';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import { UserService } from '../user';
import { BadRequestError } from '../error';
import { ConfigService } from '@nestjs/config';
import { googleScopes } from '../constants';

@Injectable()
export class GoogleApisService {
  private readonly google = google;
  private readonly client: OAuth2Client;

  constructor(
    @Inject(ConfigGoogleApisInjectionToken)
    private readonly config: AuthModuleConfig,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.client = new this.google.auth.OAuth2(
      this.config.clientId,
      this.config.clientSecret,
    );
    this.client.on('tokens', async (tokens) => {
      if (tokens.id_token && (tokens.refresh_token || tokens.access_token)) {
        await this.userService.updateUserGoogleAccessToken({
          googleUserId: tokens.id_token,
          googleAccessToken: tokens.access_token,
          googleAuthRefreshToken: tokens.refresh_token,
        });
      }
    });
  }

  async getGoogleUserByGoogleAccessToken(token: string) {
    this.client.setCredentials({
      access_token: token,
      // access_token: token,
    });
    const oauth2 = this.google.oauth2({
      auth: this.client,
      version: 'v2',
    });
    const { data } = await oauth2.userinfo.get();
    return data;
  }

  async getAllSpreadsheetsByAccessToken({ userId }: { userId: string }) {
    await this.setTokenByUserId({ userId });
    const drive = this.google.drive({
      auth: this.client,
      version: 'v3',
    });
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      fields: 'files(id, name)',
    });
    return response.data.files;
  }

  async getSpreadSheetById({
    userId,
    spreadsheetId,
  }: {
    userId: string;
    spreadsheetId: string;
  }) {
    await this.setTokenByUserId({ userId });
    const drive = this.google.drive({
      auth: this.client,
      version: 'v3',
    });

    return await drive.files.export(
      {
        fileId: spreadsheetId,
        fields: 'id, name',
        mimeType:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      {
        responseType: 'stream',
      },
    );
  }

  private async setTokenByUserId({ userId }: { userId: string }) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new BadRequestError('User not found');
    const accessToken = user.googleAuthToken;
    this.client.setCredentials({
      access_token: accessToken,
    });
  }

  getAuthUrlToConnectUserToGoogle({ userId }: { userId: string }) {
    return this.client.generateAuthUrl({
      access_type: 'offline',
      scope: googleScopes,
      state: JSON.stringify({
        appUserId: userId,
      }),
      redirect_uri: `${this.configService.get('API_URL')}/api/google/callback`,
    });
  }

  async decodeAuthCode({ code }: { code: string }) {
    return (
      await this.client.getToken({
        code,
        redirect_uri: `${this.configService.get(
          'API_URL',
        )}/api/google/callback`,
      })
    ).tokens;
  }
}
