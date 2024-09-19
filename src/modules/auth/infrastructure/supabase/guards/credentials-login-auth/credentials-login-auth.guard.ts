import { CanActivate, Injectable } from '@nestjs/common';

import { AuthGuardToken } from '~modules/auth/constants';

import { SupabaseBaseAuthGuard } from '../supabase-base-auth/supabase-base-auth.guard';

@Injectable()
export class CredentialsLoginAuthGuard
  extends SupabaseBaseAuthGuard(AuthGuardToken.SUPABASE_CREDENTIALS)
  implements CanActivate {}
