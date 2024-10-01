import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { IUserRepository } from '~modules/auth/application/repositories/user-repository.interface';
import { DrizzleUserRepository } from '~modules/auth/infrastructure/persistence/drizzle/repositories/drizzle-user.repository';
import { IPaymentCustomerRepository } from '~modules/billing/application/repositories/payment-customer-repository.interface';
import { DrizzlePaymentCustomerRepository } from '~modules/billing/infrastructure/persistence/drizzle/repositories/payment-customer/drizzle-payment-customer.repository';
import { IDbContext } from '~shared/application/services/db-context.interface';

import { CoreToken } from 'src/core/constants';
import { POSTGRES_DB } from 'src/lib/drizzle-postgres';

@Injectable({ scope: Scope.REQUEST })
export class DrizzleDbContext implements IDbContext {
  private _db: NodePgDatabase<any>;

  private _userRepository: IUserRepository;
  private _paymentCustomerRepository: IPaymentCustomerRepository;

  get userRepository() {
    return this._userRepository;
  }

  get paymentCustomerRepository() {
    return this._paymentCustomerRepository;
  }

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

  private initRepositories() {
    this._userRepository = new DrizzleUserRepository(this._db);
    this._paymentCustomerRepository = new DrizzlePaymentCustomerRepository(this._db);
  }
}
