import { Controller, Get, UseGuards } from '@nestjs/common';

import { GoogleOauth2Guard } from '../../supabase/guards/google-oauth2/google-oauth2.guard';

@Controller('auth/oauth')
export class GoogleOauth2Controller {
  @UseGuards(GoogleOauth2Guard)
  @Get('google')
  public async google() {}

  @UseGuards(GoogleOauth2Guard)
  @Get('google-callback')
  public async googleRedirect() {}
}
