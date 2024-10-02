import { Injectable, PipeTransform, ValidationPipe } from '@nestjs/common';

import { ValidationFailedException } from '../../domain/exceptions/validation-failed/validation-failed.exception';

@Injectable()
export class AppValidationPipe extends ValidationPipe implements PipeTransform {
  constructor() {
    super({
      exceptionFactory: (error) => ValidationFailedException.from(error),
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    });
  }
}
