import { AppException } from 'src/core/exceptions/domain/exceptions/base/app.exception';

import { ExceptionType } from '../../mappers/app-exception/exception-type';

export abstract class UnprocessableEntityException extends AppException {
  public readonly type: ExceptionType = ExceptionType.UNPROCESSABLE_ENTITY;
}
