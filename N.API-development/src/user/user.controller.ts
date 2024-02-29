import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDataDto } from './dto';
import { Session } from '../auth/session/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('update-session-user-data')
  @UseGuards(new AuthGuard())
  async updateUserData(
    @Body() changedUserData: UserUpdateDataDto,
    @Session() session: SessionContainer,
  ) {
    return this.userService.updateUserData({
      authId: session.getUserId(),
      userData: changedUserData,
    });
  }

  @Get('session-user')
  @UseGuards(new AuthGuard())
  async getSessionUser(@Session() session: SessionContainer) {
    const user = await this.userService.getUserByAuthId(session.getUserId());
    await session.mergeIntoAccessTokenPayload({ appUserId: user.id });
    return user;
  }
}
