import { Module } from '@nestjs/common';

import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { DrizzlePostgresModule } from 'src/lib/drizzle-postgres';

import { mergedSchema } from './schema/merged-schema';
import { DrizzleDbContext } from './services/drizzle-db-context/drizzle-db-context';

@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      useFactory: (appConfig: IAppConfigService) => ({
        db: {
          config: { connectionString: appConfig.get('DB_URL') },
          connection: 'pool',
        },
        schema: mergedSchema,
      }),
      inject: [BaseToken.APP_CONFIG],
    }),
  ],
  providers: [{ provide: BaseToken.DB_CONTEXT, useClass: DrizzleDbContext }],
  exports: [BaseToken.DB_CONTEXT],
})
export class DatabaseModule {}
