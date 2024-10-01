import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Session } from '~modules/auth/domain/value-objects/session.value';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { ReqSession } from '../../decorators/session/session.decorator';
import { GoogleOauth2Guard } from '../../supabase/guards/google-oauth2/google-oauth2.guard';

@ApiTags('auth')
@Controller('auth/oauth')
export class GoogleOauth2Controller {
  constructor(@Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService) {}

  @UseGuards(GoogleOauth2Guard)
  @ApiOperation({ operationId: 'withGoogle' })
  @Get('google')
  public async google() {}

  @UseGuards(GoogleOauth2Guard)
  @ApiExcludeEndpoint()
  @Get('google-callback')
  public async googleRedirect(@Res() res: Response, @ReqSession() session: Session) {
    const redirectUrl = new URL(this.appConfig.get('DD_CLIENT_AUTH_REDIRECT_URL'));

    redirectUrl.searchParams.set('access-token', session.accessToken);
    redirectUrl.searchParams.set('refresh-token', session.refreshToken);
    redirectUrl.searchParams.set('token_type', 'Bearer');
    res.redirect(redirectUrl.toString());
  }
}
