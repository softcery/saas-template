import { ExecutionContext, Inject, Type, mixin } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { AuthApiError } from '@supabase/supabase-js';
import { Request } from 'express';

import { AppException } from 'src/core/exceptions/domain/exceptions/base/app.exception';
import { CustomException } from 'src/core/exceptions/domain/exceptions/custom-exception/dynamic.exception';
import { UnexpectedException } from 'src/core/exceptions/domain/exceptions/unexpected-exception/unexpected.exception';
import { IAuthResult } from 'src/lib/passport-supabase';

import { SupabaseSessionMapper } from '../../mappers/session/supabase-session.mapper';
import { SupabaseUserMapper } from '../../mappers/user/supabase-user.mapper';
import { SupabaseAuthenticatedClientService } from '../../services/supabase-authenticated-client/supabase-authenticated-client.service';

export const SupabaseBaseAuthGuard = (type?: string | string[]): Type<IAuthGuard> => {
  class MixinAuthGuard extends AuthGuard(type) {
    @Inject(SupabaseUserMapper) private readonly supabaseUserMapper: SupabaseUserMapper;
    @Inject(SupabaseSessionMapper) private readonly supabaseSessionMapper: SupabaseSessionMapper;
    @Inject(SupabaseAuthenticatedClientService)
    private readonly supabaseAuthenticatedClientService: SupabaseAuthenticatedClientService;

    handleRequest<TUser = any>(error: unknown, user: TUser, info: AuthApiError, context: ExecutionContext): TUser {
      if (error && error instanceof AppException) throw error;
      if (error) throw new UnexpectedException(error);
      if (info) {
        throw CustomException.builder().httpStatus(info.status).message(info.message).code(info.code).build();
      }

      this.assertIsAuthResult(user);

      const domainSession = user.session ? this.supabaseSessionMapper.toDomain(user.session) : null;
      const domainUser = user.user ? this.supabaseUserMapper.toDomain(user.user) : null;

      const request: Request = this.getRequest(context);

      request.session = domainSession;

      if (domainSession) {
        return this.supabaseAuthenticatedClientService
          .authenticateWithSession(domainSession)
          .then(() => domainUser) as TUser;
      }
      if (request.accessToken) {
        return this.supabaseAuthenticatedClientService
          .authenticateWithAccessToken(request.accessToken)
          .then(() => domainUser) as TUser;
      }
      return domainUser as TUser;
    }

    private assertIsAuthResult(authResult: unknown): asserts authResult is IAuthResult {
      if (typeof authResult !== 'object' || !('session' in authResult) || !('user' in authResult)) {
        throw new Error('Invalid auth result');
      }
    }
  }

  return mixin(MixinAuthGuard);
};
