import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Prisma } from '@prisma/client';
import { UserUpdateDataDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: Prisma.UserCreateInput) {
    return this.userRepository.createUser(user);
  }

  async updateUserData(params: {
    authId: string;
    userData: UserUpdateDataDto;
  }) {
    return this.userRepository.updateUserData({
      authId: params.authId,
      userData: params.userData,
    });
  }

  async getUserByAuthId(userAuthId: string) {
    return this.userRepository.getUserByAuthId(userAuthId);
  }

  getUserByEmail(params: { email: string }) {
    return this.userRepository.getUserByEmail(params);
  }

  getUserById(id: string) {
    return this.userRepository.getUserById(id);
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
    return this.userRepository.updateUserGoogleAccessToken(params);
  }

  setUserGoogleCredentials(params: {
    googleUserId: string;
    googleAccessToken?: string;
    googleAuthRefreshToken?: string;
    userId: string;
  }) {
    return this.userRepository.setUserGoogleCredentials(params);
  }
}
