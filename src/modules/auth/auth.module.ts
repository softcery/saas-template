import { Module } from '@nestjs/common';

import { CredentialsAuthController } from './infrastructure/controllers/credentials-auth/credentials-auth.controller';
import { SupabaseCredentialsLoginAuthStrategy } from './infrastructure/supabase/strategies/credentials-login/supabase-credentials-login-auth.strategy';

@Module({
  providers: [SupabaseCredentialsLoginAuthStrategy],
  controllers: [CredentialsAuthController],
})
export class AuthModule {}
