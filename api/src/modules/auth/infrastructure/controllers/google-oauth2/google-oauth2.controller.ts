import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { PerformPostAuthUseCase } from '~modules/auth/application/use-cases/perform-post-auth/perform-post-auth.use-case';
import { AuthDiToken } from '~modules/auth/constants';
import { User } from '~modules/auth/domain/entities/user.entity';
import { Session } from '~modules/auth/domain/value-objects/session.value';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { ReqSession } from '../../decorators/session/session.decorator';
import { ReqUser } from '../../decorators/user/user.decorator';
import { GoogleOauth2Guard } from '../../supabase/guards/google-oauth2/google-oauth2.guard';

@ApiTags('auth')
@Controller('auth/oauth')
export class GoogleOauth2Controller {
  constructor(
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
    @Inject(AuthDiToken.PERFORM_POST_AUTH_USE_CASE) private readonly performPostAuthUseCase: PerformPostAuthUseCase,
  ) {}

  @UseGuards(GoogleOauth2Guard)
  @ApiOperation({ operationId: 'withGoogle' })
  @Get('google')
  public async google() {}

  @UseGuards(GoogleOauth2Guard)
  @ApiExcludeEndpoint()
  @Get('google-callback')
  public async googleRedirect(@Res() res: Response, @ReqSession() session: Session, @ReqUser() user: User) {
    await this.performPostAuthUseCase.execute({ user });
    const redirectUrl = new URL(this.appConfig.get('DD_CLIENT_AUTH_REDIRECT_URL'));
    redirectUrl.searchParams.set('access-token', session.accessToken);
    redirectUrl.searchParams.set('refresh-token', session.refreshToken);
    redirectUrl.searchParams.set('token_type', 'Bearer');
    res.redirect(redirectUrl.toString());
  }
}
