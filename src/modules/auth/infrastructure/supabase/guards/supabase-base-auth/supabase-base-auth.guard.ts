import { Type } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { AuthApiError } from '@supabase/supabase-js';

import { CustomException } from 'src/core/exceptions/domain/exceptions/custom-exception/dynamic.exception';
import { UnexpectedException } from 'src/core/exceptions/domain/exceptions/unexpected-exception/unexpected.exception';
import { IAuthResult } from 'src/lib/passport-supabase';

export const SupabaseBaseAuthGuard = (type?: string | string[]): Type<IAuthGuard> => {
  return class extends AuthGuard(type) {
    handleRequest<TUser = IAuthResult>(error: unknown, user: TUser, info: AuthApiError): TUser {
      if (error) throw new UnexpectedException(error);
      if (info) {
        throw CustomException.builder().httpStatus(info.status).message(info.message).code(info.code).build();
      }
      return user;
    }
  };
};
