import { UserModule, UserService } from '../user';
import { Module } from '@nestjs/common';
import EmailPassword from 'supertokens-node/recipe/thirdpartyemailpassword';
import EmailVerification from 'supertokens-node/recipe/emailverification';
import { IMockUser } from './interface';
import { MOCK_USERS } from '../mock';

@Module({
  imports: [UserModule],
})
export class OnAppInitModule {
  constructor(private readonly userService: UserService) {}

  private async createUser(creds: IMockUser[]) {
    for (const cred of creds) {
      const response = await EmailPassword.emailPasswordSignUp(
        '',
        cred.email,
        cred.password,
      );
      if (response.status === 'OK') {
        const resEmailVerificationToken =
          await EmailVerification.createEmailVerificationToken(
            'public',
            response.user.id,
          );
        // If the token creation is successful, use the token to verify the user's email
        if (resEmailVerificationToken.status === 'OK') {
          await EmailVerification.verifyEmailUsingToken(
            'public',
            resEmailVerificationToken.token,
          );
        }
        const savedUser = await this.userService.getUserByEmail({
          email: cred.email,
        });
        if (!savedUser) {
          await this.userService.createUser({
            authId: response.user.id,
            email: cred.email,
            firstName: cred.firstName,
            lastName: cred.lastName,
            phoneNumber: cred.phoneNumber,
          });
        }
      }
    }
  }

  async onModuleInit() {
    await this.createUser(MOCK_USERS);
  }
}
