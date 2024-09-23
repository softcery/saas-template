import { Controller, Post, UseGuards } from '@nestjs/common';

import { JwtRefreshAuthGuard } from '../../supabase/guards/jwt-refresh-auth/jwt-refresh-auth.guard';

@Controller('auth/token')
export class JwtManagementController {
  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  public async refresh() {}
}
