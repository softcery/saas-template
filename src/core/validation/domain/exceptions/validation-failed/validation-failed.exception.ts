import { ValidationError } from 'class-validator';

import { ClientException } from 'src/core/exceptions/domain/exceptions/client-exception/client.exception';

export class ValidationFailedException extends ClientException {
  public static readonly CODE = 'VALIDATION_FAILED';

  constructor(message: string) {
    super(ValidationFailedException.CODE, message);
  }

  public static from(validationErrors: ValidationError[]) {
    return new ValidationFailedException(
      validationErrors.map((validationError) => validationError.toString(false, false, '', true)).join('\n'),
    );
  }
}
