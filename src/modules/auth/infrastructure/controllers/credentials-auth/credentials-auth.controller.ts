import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { CredentialsLoginAuthGuard } from '../../supabase/guards/credentials-login-auth/credentials-login-auth.guard';
import { GoogleOauth2Guard } from '../../supabase/guards/google-oauth2/google-oauth2.guard';
import { JwtAccessAuthGuard } from '../../supabase/guards/jwt-access-auth/jwt-access-auth.guard';
import { JwtRefreshAuthGuard } from '../../supabase/guards/jwt-refresh-auth/jwt-refresh-auth.guard';

@Controller('auth')
export class CredentialsAuthController {
  @Post('/sign-in')
  @UseGuards(CredentialsLoginAuthGuard)
  public async signIn() {}

  @Get('/jwt')
  @UseGuards(JwtAccessAuthGuard)
  public async jwt() {}

  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  public async refresh() {}

  @UseGuards(GoogleOauth2Guard)
  @Get('google')
  public async google() {}

  @UseGuards(GoogleOauth2Guard)
  @Get('google-callback')
  public async googleRedirect() {}
}
