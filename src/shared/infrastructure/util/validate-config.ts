import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { AppConfigModel } from '~shared/application/models/app-config.model';

export function validateConfig(config: Record<string, unknown>, model: ClassConstructor<AppConfigModel>) {
  const validatedConfig = plainToInstance(model, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
