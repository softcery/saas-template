import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { EmailPasswordCredentialsDto } from '~modules/auth/application/dto/email-password-credentials.dto';
import { IPerformPostAuthUseCase } from '~modules/auth/application/use-cases/perform-post-auth/perform-post-auth-use-case';
import { ISignUpByEmailPasswordUseCase } from '~modules/auth/application/use-cases/sign-up-by-email-password/sign-up-by-email-password-use-case.interface';
import { AuthDiToken } from '~modules/auth/constants';
import { User } from '~modules/auth/domain/entities/user.entity';
import { AuthCredentialsMapper } from '~modules/auth/domain/mappers/auth-credentials/auth-credentials.mapper';
import { Session } from '~modules/auth/domain/value-objects/session.value';

import { PublicRoute } from '../../decorators/public-route/public-route.decorator';
import { ReqSession } from '../../decorators/session/session.decorator';
import { ReqUser } from '../../decorators/user/user.decorator';
import { CredentialsLoginAuthGuard } from '../../supabase/guards/credentials-login-auth/credentials-login-auth.guard';

@ApiTags('auth')
@PublicRoute()
@Controller('auth')
export class CredentialsAuthController {
  constructor(
    private readonly authCredentialsMapper: AuthCredentialsMapper,
    @Inject(AuthDiToken.SIGN_UP_BY_EMAIL_PASSWORD)
    private readonly signUpByEmailPasswordUseCase: ISignUpByEmailPasswordUseCase,
    @Inject(AuthDiToken.PERFORM_POST_AUTH_USE_CASE) private readonly performPostAuthUseCase: IPerformPostAuthUseCase,
  ) {}

  @ApiOperation({ operationId: 'signIn' })
  @ApiBody({
    type: EmailPasswordCredentialsDto,
  })
  @Post('/sign-in')
  @UseGuards(CredentialsLoginAuthGuard)
  public async signIn(@ReqSession() session: Session, @ReqUser() user: User) {
    await this.performPostAuthUseCase.execute({ user });
    return this.authCredentialsMapper.sessionToTokenResult(session);
  }

  @ApiOperation({ operationId: 'signUp' })
  @Post('/sign-up')
  public async signUp(@Body() credentials: EmailPasswordCredentialsDto) {
    await this.signUpByEmailPasswordUseCase.execute(credentials);
  }
}
