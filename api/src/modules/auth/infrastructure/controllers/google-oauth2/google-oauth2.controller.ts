import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GoogleOauth2Guard } from '../../supabase/guards/google-oauth2/google-oauth2.guard';

@ApiTags('auth')
@Controller('auth/oauth')
export class GoogleOauth2Controller {
  @UseGuards(GoogleOauth2Guard)
  @ApiOperation({ operationId: 'withGoogle' })
  @Get('google')
  public async google() {}

  @UseGuards(GoogleOauth2Guard)
  @ApiExcludeEndpoint()
  @Get('google-callback')
  public async googleRedirect() {}
}
