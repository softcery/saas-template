import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProvideRefreshTokenDto } from '~modules/auth/application/dto/provide-refresh-token.dto';

import { JwtRefreshAuthGuard } from '../../supabase/guards/jwt-refresh-auth/jwt-refresh-auth.guard';

@ApiTags('auth')
@Controller('auth/tokens')
export class JwtManagementController {
  @ApiOperation({ operationId: 'refresh' })
  @ApiBody({
    type: ProvideRefreshTokenDto,
  })
  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  public async refresh() {}
}
