import { CanActivate, Injectable } from '@nestjs/common';

import { AuthGuardToken } from '~modules/auth/constants';

import { SupabaseBaseAuthGuard } from '../supabase-base-auth/supabase-base-auth.guard';

@Injectable()
export class JwtAccessAuthGuard extends SupabaseBaseAuthGuard(AuthGuardToken.JWT_ACCESS) implements CanActivate {}
