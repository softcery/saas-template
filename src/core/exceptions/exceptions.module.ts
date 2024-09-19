import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppExceptionMapper } from './domain/mappers/app-exception/app-exception.mapper';
import { GlobalExceptionsFilter } from './infrastructure/filters/global-exceptions/global-exceptions.filter';
import { ErrorInterceptor } from './infrastructure/interceptors/error/error.interceptor';

@Module({
  providers: [
    {
      useClass: GlobalExceptionsFilter,
      provide: APP_FILTER,
    },
    {
      useClass: ErrorInterceptor,
      provide: APP_INTERCEPTOR,
    },
    AppExceptionMapper,
  ],
})
export class ExceptionsModule {}
