import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AppException } from '../../exceptions/base/app.exception';
import { UnexpectedException } from '../../exceptions/unexpected-exception/unexpected.exception';
import { EXCEPTION_STATUSES_TYPE, ExceptionType } from './exception-type';

@Injectable()
export class AppExceptionMapper {
  public from(exception: AppException): AppException;
  public from(exception: HttpException): AppException;
  public from(exception: unknown): AppException;
  public from(exception: AppException | HttpException | unknown): AppException {
    if (exception instanceof AppException) return exception;
    if (exception instanceof HttpException) {
      const httpException = exception;

      return new (class extends AppException {
        public readonly type: ExceptionType =
          EXCEPTION_STATUSES_TYPE[httpException.getStatus()] || HttpStatus.BAD_REQUEST;

        constructor() {
          super('HTTP', httpException.message);
        }
      })();
    } else {
      return new UnexpectedException(exception);
    }
  }
}
