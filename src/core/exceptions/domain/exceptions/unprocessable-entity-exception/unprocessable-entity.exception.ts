import { ExceptionType } from '~shared/core/exceptions/domain/exception-type';

import { AppException } from 'src/core/exceptions/domain/exceptions/base/app.exception';

export abstract class UnprocessableEntityException extends AppException {
  public readonly type: ExceptionType = ExceptionType.UNPROCESSABLE_ENTITY;
}
