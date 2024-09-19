import { Module } from '@nestjs/common';

import { CredentialsAuthController } from './infrastructure/controllers/credentials-auth/credentials-auth.controller';
import { SupabaseCredentialsLoginAuthStrategy } from './infrastructure/supabase/strategies/credentials-login/supabase-credentials-login-auth.strategy';
import { SupabaseJwtAccessAuthStrategy } from './infrastructure/supabase/strategies/jwt-access/supabase-jwt-access-auth.strategy';
import { SupabaseJwtRefreshAuthStrategy } from './infrastructure/supabase/strategies/jwt-refresh/supabase-jwt-refresh-auth.strategy';

@Module({
  providers: [SupabaseCredentialsLoginAuthStrategy, SupabaseJwtAccessAuthStrategy, SupabaseJwtRefreshAuthStrategy],
  controllers: [CredentialsAuthController],
})
export class AuthModule {}
