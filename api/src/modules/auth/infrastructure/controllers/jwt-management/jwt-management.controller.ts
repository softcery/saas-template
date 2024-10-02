import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProvideRefreshTokenDto } from '~modules/auth/application/dto/provide-refresh-token.dto';

import { PublicRoute } from '../../decorators/public-route/public-route.decorator';
import { JwtRefreshAuthGuard } from '../../supabase/guards/jwt-refresh-auth/jwt-refresh-auth.guard';

@ApiTags('auth')
@Controller('auth/tokens')
export class JwtManagementController {
  @ApiOperation({ operationId: 'refresh' })
  @ApiBody({
    type: ProvideRefreshTokenDto,
  })
  @PublicRoute()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('/refresh')
  public async refresh() {}
}
