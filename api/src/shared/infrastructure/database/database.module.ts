import { Global, Module } from '@nestjs/common';

import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { DrizzlePostgresModule } from 'src/lib/drizzle-postgres';

import { DrizzleDbContext } from './drizzle/db-context/drizzle-db-context';
import { mergeDbdSchema } from './schema/merged-schema';

@Global()
@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      useFactory: (appConfig: IAppConfigService) => ({
        db: {
          config: { connectionString: appConfig.get('DB_URL') },
          connection: 'pool',
        },
        schema: mergeDbdSchema,
      }),
      inject: [BaseToken.APP_CONFIG],
    }),
  ],
  providers: [{ provide: BaseToken.DB_CONTEXT, useClass: DrizzleDbContext }],
  exports: [BaseToken.DB_CONTEXT],
})
export class DatabaseModule {}
