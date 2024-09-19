import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

import { AppExceptionMapper } from 'src/core/exceptions/domain/mappers/app-exception/app-exception.mapper';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly _exceptionMapper: AppExceptionMapper) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(() => {
          return this._exceptionMapper.from(err);
        });
      }),
    );
  }
}
