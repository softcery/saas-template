import { Global, Logger, Module, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

import { CoreToken } from '../constants';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            process.env.NODE_ENV === 'development' ? utilities.format.nestLike() : winston.format.json(),
          ),
        }),
      ],
    }),
  ],
  providers: [
    {
      provide: CoreToken.APP_LOGGER,
      scope: Scope.TRANSIENT,
      inject: [INQUIRER],
      useFactory: (parentClass: object) => new Logger(parentClass.constructor.name),
    },
  ],
  exports: [CoreToken.APP_LOGGER],
})
export class LoggerModule {}
