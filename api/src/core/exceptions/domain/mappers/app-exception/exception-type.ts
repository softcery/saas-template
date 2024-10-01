import { HttpStatus } from '@nestjs/common';

export enum ExceptionType {
  CLIENT = 'client',
  SERVER = 'server',
  AUTHENTICATION = 'authentication',
  NOT_ALLOWED = 'authorization',
  NOT_FOUND = 'not_found',
  TOO_MANY_REQUESTS = 'too_many_requests',
  UNPROCESSABLE_ENTITY = 'unprocessable_entity',
  DYNAMIC = 'dynamic',
}

export const EXCEPTION_TYPE_STATUSES: Record<ExceptionType, HttpStatus> = {
  [ExceptionType.CLIENT]: HttpStatus.BAD_REQUEST,
  [ExceptionType.SERVER]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ExceptionType.AUTHENTICATION]: HttpStatus.UNAUTHORIZED,
  [ExceptionType.NOT_ALLOWED]: HttpStatus.FORBIDDEN,
  [ExceptionType.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ExceptionType.TOO_MANY_REQUESTS]: HttpStatus.TOO_MANY_REQUESTS,
  [ExceptionType.UNPROCESSABLE_ENTITY]: HttpStatus.UNPROCESSABLE_ENTITY,
  [ExceptionType.DYNAMIC]: HttpStatus.BAD_REQUEST,
};

export const EXCEPTION_STATUSES_TYPE: Record<HttpStatus, ExceptionType> = Object.fromEntries(
  Object.entries(EXCEPTION_TYPE_STATUSES).map(([type, status]) => [status, type]),
) as Record<HttpStatus, ExceptionType>;
