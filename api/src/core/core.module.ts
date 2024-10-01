import { Module } from '@nestjs/common';

import { ExceptionsModule } from './exceptions/exceptions.module';
import { LoggerModule } from './logger/logger.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [ValidationModule, ExceptionsModule, LoggerModule],
})
export class CoreModule {}
