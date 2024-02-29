import { PrismaService } from '../prisma';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  get user() {
    return this.prisma.user;
  }

  async createUser(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: user,
    });
  }

  async updateUserData(params: {
    authId: string;
    userData: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
    };
  }) {
    return this.user.update({
      where: {
        authId: params.authId,
      },
      data: {
        ...params.userData,
      },
    });
  }

  async getUserByAuthId(userAuthId: string) {
    return this.user.findUnique({
      where: {
        authId: userAuthId,
      },
    });
  }

  getUserByEmail(params: { email: string }) {
    return this.user.findUnique({
      where: {
        email: params.email,
      },
    });
  }

  getUserById(id: string) {
    return this.user.findUnique({
      where: {
        id,
      },
    });
  }

  updateUserGoogleAccessToken(
    params:
      | {
          googleUserId: string;
          googleAccessToken?: string;
          googleAuthRefreshToken?: string;
        }
      | {
          userId: string;
          googleAccessToken?: string;
          googleAuthRefreshToken?: string;
          googleUserId: string;
        },
  ) {
    if ('userId' in params) {
      return this.user.update({
        where: {
          id: params.userId,
        },
        data: {
          googleUserId: params.googleUserId,
          googleAuthToken: params.googleAccessToken,
          googleAuthRefreshToken: params.googleAccessToken,
        },
      });
    } else {
      return this.user.updateMany({
        where: {
          googleUserId: params.googleUserId,
        },
        data: {
          googleAuthToken: params.googleAccessToken,
          googleAuthRefreshToken: params.googleAccessToken,
        },
      });
    }
  }

  setUserGoogleCredentials(params: {
    googleUserId: string;
    googleAccessToken?: string;
    googleAuthRefreshToken?: string;
    userId: string;
  }) {
    return this.user.update({
      where: {
        id: params.userId,
      },
      data: {
        googleUserId: params.googleUserId,
        googleAuthToken: params.googleAccessToken,
        googleAuthRefreshToken: params.googleAuthRefreshToken,
      },
    });
  }
}
