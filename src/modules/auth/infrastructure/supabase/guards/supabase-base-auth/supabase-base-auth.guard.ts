import { Type } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { AuthApiError, Session } from '@supabase/supabase-js';

import { CustomException } from 'src/core/exceptions/domain/exceptions/custom-exception/dynamic.exception';
import { UnexpectedException } from 'src/core/exceptions/domain/exceptions/unexpected-exception/unexpected.exception';

export const SupabaseBaseAuthGuard = (type?: string | string[]): Type<IAuthGuard> => {
  return class extends AuthGuard(type) {
    handleRequest<TUser = Session>(error: unknown, user: TUser, info: AuthApiError): TUser {
      if (error) throw new UnexpectedException(error);
      if (info) {
        throw CustomException.builder().httpStatus(info.status).message(info.message).code(info.code).build();
      }
      return user;
    }
  };
};
