import { Module } from '@nestjs/common';

import { CredentialsAuthController } from './infrastructure/controllers/credentials-auth/credentials-auth.controller';
import { SupabaseCredentialsLoginAuthStrategy } from './infrastructure/supabase/strategies/credentials-login/supabase-credentials-login-auth.strategy';
import { SupabaseJwtAccessAuthStrategy } from './infrastructure/supabase/strategies/jwt-access/supabase-jwt-access-auth.strategy';

@Module({
  providers: [SupabaseCredentialsLoginAuthStrategy, SupabaseJwtAccessAuthStrategy],
  controllers: [CredentialsAuthController],
})
export class AuthModule {}
