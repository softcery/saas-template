import { Module } from '@nestjs/common';

import { AuthCredentialsMapper } from './domain/mappers/auth-credentials/auth-credentials.mapper';
import { CredentialsAuthController } from './infrastructure/controllers/credentials-auth/credentials-auth.controller';
import { GoogleOauth2Controller } from './infrastructure/controllers/google-oauth2/google-oauth2.controller';
import { JwtManagementController } from './infrastructure/controllers/jwt-management/jwt-management.controller';
import { SupabaseSessionMapper } from './infrastructure/supabase/mappers/session/supabase-session.mapper';
import { SupabaseUserMapper } from './infrastructure/supabase/mappers/user/supabase-user.mapper';
import { SupabaseEmailPasswordLoginAuthStrategy } from './infrastructure/supabase/strategies/credentials-login/supabase-email-password-login-auth.strategy';
import { SupabaseGoogleOAuth2Strategy } from './infrastructure/supabase/strategies/google-oauth2/supabase-google-oauth2.strategy';
import { SupabaseJwtAccessAuthStrategy } from './infrastructure/supabase/strategies/jwt-access/supabase-jwt-access-auth.strategy';
import { SupabaseJwtRefreshAuthStrategy } from './infrastructure/supabase/strategies/jwt-refresh/supabase-jwt-refresh-auth.strategy';

@Module({
  providers: [
    SupabaseEmailPasswordLoginAuthStrategy,
    SupabaseJwtAccessAuthStrategy,
    SupabaseJwtRefreshAuthStrategy,
    SupabaseGoogleOAuth2Strategy,
    SupabaseUserMapper,
    SupabaseSessionMapper,
    AuthCredentialsMapper,
  ],
  controllers: [CredentialsAuthController, GoogleOauth2Controller, JwtManagementController],
})
export class AuthModule {}
