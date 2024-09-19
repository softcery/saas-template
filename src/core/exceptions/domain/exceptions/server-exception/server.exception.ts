import { ExceptionType } from '../../mappers/app-exception/exception-type';
import { AppException } from '../base/app.exception';

export abstract class ServerException extends AppException {
  public readonly type: ExceptionType = ExceptionType.SERVER;
}
