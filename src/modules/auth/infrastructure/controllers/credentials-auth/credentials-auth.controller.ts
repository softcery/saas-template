import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { CredentialsLoginAuthGuard } from '../../supabase/guards/credentials-login-auth/credentials-login-auth.guard';

@Controller('auth')
export class CredentialsAuthController {
  @Post('/sign-in')
  @UseGuards(CredentialsLoginAuthGuard)
  public async signIn(@Req() request: Request) {
    console.log(request.user);
  }
}
