import { Module } from '@nestjs/common';

import { CredentialsAuthController } from './infrastructure/controllers/credentials-auth/credentials-auth.controller';
import { SupabaseCredentialsLoginAuthStrategy } from './infrastructure/supabase/strategies/credentials-login/supabase-credentials-login-auth.strategy';
import { SupabaseGoogleOAuth2Strategy } from './infrastructure/supabase/strategies/google-oauth2/supabase-google-oauth2.strategy';
import { SupabaseJwtAccessAuthStrategy } from './infrastructure/supabase/strategies/jwt-access/supabase-jwt-access-auth.strategy';
import { SupabaseJwtRefreshAuthStrategy } from './infrastructure/supabase/strategies/jwt-refresh/supabase-jwt-refresh-auth.strategy';

@Module({
  providers: [
    SupabaseCredentialsLoginAuthStrategy,
    SupabaseJwtAccessAuthStrategy,
    SupabaseJwtRefreshAuthStrategy,
    SupabaseGoogleOAuth2Strategy,
  ],
  controllers: [CredentialsAuthController],
})
export class AuthModule {}
