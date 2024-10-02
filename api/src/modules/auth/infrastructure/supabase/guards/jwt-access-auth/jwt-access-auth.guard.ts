import { CanActivate, ExecutionContext, Injectable, Scope } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { AuthGuardToken, AuthMetadataKey } from '~modules/auth/constants';

import { SupabaseBaseAuthGuard } from '../supabase-base-auth/supabase-base-auth.guard';

@Injectable({ scope: Scope.REQUEST })
export class JwtAccessAuthGuard extends SupabaseBaseAuthGuard(AuthGuardToken.JWT_ACCESS) implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(AuthMetadataKey.IS_PUBLIC_METADATA, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
