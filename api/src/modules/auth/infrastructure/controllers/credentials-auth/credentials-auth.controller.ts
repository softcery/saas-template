import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { EmailPasswordCredentialsDto } from '~modules/auth/application/dto/email-password-credentials.dto';
import { ISignUpByEmailPasswordUseCase } from '~modules/auth/application/use-cases/sign-up-by-email-password/sign-up-by-email-password-use-case.interface';
import { AuthDiToken } from '~modules/auth/constants';
import { AuthCredentialsMapper } from '~modules/auth/domain/mappers/auth-credentials/auth-credentials.mapper';
import { Session } from '~modules/auth/domain/value-objects/session.value';

import { ReqSession } from '../../decorators/session/session.decorator';
import { CredentialsLoginAuthGuard } from '../../supabase/guards/credentials-login-auth/credentials-login-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class CredentialsAuthController {
  constructor(
    private readonly authCredentialsMapper: AuthCredentialsMapper,
    @Inject(AuthDiToken.SIGN_UP_BY_EMAIL_PASSWORD)
    private readonly signUpByEmailPasswordUseCase: ISignUpByEmailPasswordUseCase,
  ) {}

  @ApiOperation({ operationId: 'signIn' })
  @ApiBody({
    type: EmailPasswordCredentialsDto,
  })
  @Post('/sign-in')
  @UseGuards(CredentialsLoginAuthGuard)
  public async signIn(@ReqSession() session: Session) {
    return this.authCredentialsMapper.sessionToTokenResult(session);
  }

  @ApiOperation({ operationId: 'signUp' })
  @Post('/sign-up')
  public async signUp(@Body() credentials: EmailPasswordCredentialsDto) {
    await this.signUpByEmailPasswordUseCase.execute(credentials);
  }
}
