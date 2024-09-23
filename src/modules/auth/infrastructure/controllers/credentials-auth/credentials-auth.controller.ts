import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthCredentialsMapper } from '~modules/auth/domain/mappers/auth-credentials/auth-credentials.mapper';
import { Session } from '~modules/auth/domain/value-objects/session.value';

import { ReqSession } from '../../decorators/session/session.decorator';
import { CredentialsLoginAuthGuard } from '../../supabase/guards/credentials-login-auth/credentials-login-auth.guard';
import { JwtAccessAuthGuard } from '../../supabase/guards/jwt-access-auth/jwt-access-auth.guard';

@Controller('auth')
export class CredentialsAuthController {
  constructor(private readonly authCredentialsMapper: AuthCredentialsMapper) {}

  @Post('/sign-in')
  @UseGuards(CredentialsLoginAuthGuard)
  public async signIn(@ReqSession() session: Session) {
    return this.authCredentialsMapper.sessionToTokenResult(session);
  }

  @Get('/jwt')
  @UseGuards(JwtAccessAuthGuard)
  public async a() {}
}
