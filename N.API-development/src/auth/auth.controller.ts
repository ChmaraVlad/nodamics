import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import SessionManager from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import { AuthGuard } from './auth.guard';
import { Session } from './session';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { ChangePasswordDto } from './dto';
import { BadRequestError } from '../error';
import { errorMessages, passwordRegex } from '../constants';

@Controller('auth')
export class AuthController {
  @Post('change-password')
  @UseGuards(new AuthGuard())
  async changePassword(
    @Session() session: SessionContainer,
    @Body() body: ChangePasswordDto,
  ) {
    const { oldPassword, newPassword } = body;
    const passwordValidation = passwordRegex.test(newPassword);
    if (!passwordValidation) {
      throw new BadRequestError(errorMessages.passwordValidationFailed);
    }
    const userId = session.getUserId();
    const userInfo = await EmailPassword.getUserById(userId);
    if (userInfo === undefined) {
      throw new BadRequestError('Wrong user');
    }
    const isPasswordValid = await EmailPassword.emailPasswordSignIn(
      session.getTenantId(),
      userInfo.email,
      oldPassword,
    );

    if (isPasswordValid.status !== 'OK') {
      throw new BadRequestError('Wrong password');
    }
    const response = await EmailPassword.updateEmailOrPassword({
      userId,
      password: newPassword,
    });

    //logout all sessions
    await Promise.all([
      await SessionManager.revokeAllSessionsForUser(userId),
      await session!.revokeSession(),
    ]);

    return response;
  }
}
