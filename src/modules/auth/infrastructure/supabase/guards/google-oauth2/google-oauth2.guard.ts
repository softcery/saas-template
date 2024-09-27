import { CanActivate, Injectable } from '@nestjs/common';

import { AuthGuardToken } from '~modules/auth/constants';

import { SupabaseBaseAuthGuard } from '../supabase-base-auth/supabase-base-auth.guard';

@Injectable()
export class GoogleOauth2Guard extends SupabaseBaseAuthGuard(AuthGuardToken.GOOGLE_OAUTH2) implements CanActivate {}
