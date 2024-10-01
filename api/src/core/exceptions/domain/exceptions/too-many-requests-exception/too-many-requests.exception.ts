import { ExceptionType } from '../../mappers/app-exception/exception-type';
import { AppException } from '../base/app.exception';

export abstract class TooManyRequestsException extends AppException {
  public type: ExceptionType = ExceptionType.TOO_MANY_REQUESTS;
}
