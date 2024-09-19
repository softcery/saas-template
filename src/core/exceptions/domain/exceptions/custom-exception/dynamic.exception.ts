import { Builder } from 'builder-pattern';

import { ExceptionType } from '../../mappers/app-exception/exception-type';
import { AppException } from '../base/app.exception';

export class CustomException extends AppException {
  public httpStatus: number;

  public readonly type = ExceptionType.DYNAMIC;

  public static builder() {
    return Builder(CustomException, { code: 'DYNAMIC_EXCEPTION' });
  }
}
