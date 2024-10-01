import { Module } from '@nestjs/common';

import { ChangeEmailUseCase } from './application/use-cases/change-email/change-email.use-case';
import { ChangePasswordUseCase } from './application/use-cases/change-password/change-password.use-case';
import { ResetPasswordUseCase } from './application/use-cases/reset-password/reset-password.use-case';
import { SendResetPasswordConfirmationUseCase } from './application/use-cases/send-reset-password-confirmation/send-reset-password-confirmation.use-case';
import { AuthDiToken } from './constants';
import { AuthCredentialsMapper } from './domain/mappers/auth-credentials/auth-credentials.mapper';
import { CredentialsAuthController } from './infrastructure/controllers/credentials-auth/credentials-auth.controller';
import { CredentialsManagementController } from './infrastructure/controllers/credentials-management/credentials-management.controller';
import { GoogleOauth2Controller } from './infrastructure/controllers/google-oauth2/google-oauth2.controller';
import { JwtManagementController } from './infrastructure/controllers/jwt-management/jwt-management.controller';
import { BcryptPasswordService } from './infrastructure/services/password/bcrypt-password.service';
import { SupabaseSessionMapper } from './infrastructure/supabase/mappers/session/supabase-session.mapper';
import { SupabaseUserMapper } from './infrastructure/supabase/mappers/user/supabase-user.mapper';
import { SupabaseAuthService } from './infrastructure/supabase/services/auth/supabase-auth.service';
import { SupabaseAuthenticatedClientService } from './infrastructure/supabase/services/supabase-authenticated-client/supabase-authenticated-client.service';
import { SupabaseClientService } from './infrastructure/supabase/services/supabase-client/supabase-client.service';
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
    SupabaseAuthenticatedClientService,
    { provide: AuthDiToken.AUTH_SERVICE, useClass: SupabaseAuthService },
    { provide: AuthDiToken.CHANGE_PASSWORD_USE_CASE, useClass: ChangePasswordUseCase },
    { provide: AuthDiToken.CHANGE_EMAIL_USE_CASE, useClass: ChangeEmailUseCase },
    SupabaseClientService,
    { provide: AuthDiToken.SEND_RESET_PASSWORD_CONFIRMATION_USE_CASE, useClass: SendResetPasswordConfirmationUseCase },
    { provide: AuthDiToken.RESET_PASSWORD_USE_CASE, useClass: ResetPasswordUseCase },
    { provide: AuthDiToken.PASSWORD_SERVICE, useClass: BcryptPasswordService },
  ],
  controllers: [
    CredentialsAuthController,
    GoogleOauth2Controller,
    JwtManagementController,
    CredentialsManagementController,
  ],
})
export class AuthModule {}
