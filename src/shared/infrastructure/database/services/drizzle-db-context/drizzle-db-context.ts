import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { IDbContext } from '~shared/application/services/db-context.interface';

import { CoreToken } from 'src/core/constants';
import { POSTGRES_DB } from 'src/lib/drizzle-postgres';

export abstract class IDrizzleRepository<Schema extends Record<string, unknown> = any> {
  constructor(protected readonly db: NodePgDatabase<Schema>) {}
}

@Injectable({ scope: Scope.REQUEST })
export class DrizzleDbContext implements IDbContext {
  private _db: NodePgDatabase<any>;

  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<any>,
    @Inject(CoreToken.APP_LOGGER) private readonly logger: Logger,
  ) {
    this._db = db;
    this.initRepositories();
  }

  public async commitTransaction(): Promise<void> {
    this.logger.warn(
      'Transaction was not committed: current db context implementation does not provide transaction functionality yet',
    );
  }
  public async rollbackTransaction(): Promise<void> {
    this.logger.warn(
      'Not transaction to rollback: current db context implementation does not provide transaction functionality yet',
    );
  }
  public async startTransaction(): Promise<void> {
    this.logger.warn(
      'Transaction was not started: current db context implementation does not provide transaction functionality yet',
    );
  }

  private initRepositories() {}
}
