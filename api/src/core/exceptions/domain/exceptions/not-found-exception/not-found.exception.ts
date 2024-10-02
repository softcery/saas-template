import { ExceptionType } from '../../mappers/app-exception/exception-type';
import { AppException } from '../base/app.exception';

export abstract class NotFoundException extends AppException {
  public readonly type = ExceptionType.NOT_FOUND;
}
