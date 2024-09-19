import { ExceptionType } from '../../mappers/app-exception/exception-type';
import { AppException } from '../base/app.exception';

export abstract class ClientException extends AppException {
  public readonly type: ExceptionType = ExceptionType.CLIENT;
}
