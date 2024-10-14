import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { IUserRepository } from '~modules/auth/application/repositories/user-repository.interface';
import { DrizzleUserRepository } from '~modules/auth/infrastructure/persistence/drizzle/repositories/drizzle-user.repository';
import { IPaymentCustomerRepository } from '~modules/billing/application/repositories/payment-customer-repository.interface';
import { DrizzlePaymentCustomerRepository } from '~modules/billing/infrastructure/persistence/drizzle/repositories/payment-customer/drizzle-payment-customer.repository';
import { IDbContext } from '~shared/application/services/db-context.interface';

import { CoreToken } from 'src/core/constants';
import { POSTGRES_DB } from 'src/lib/drizzle-postgres';
import { PromiseWithResolvers, withResolvers } from 'src/lib/promise-with-resolvers';

@Injectable({ scope: Scope.REQUEST })
export class DrizzleDbContext implements IDbContext {
  private _db: NodePgDatabase<any>;
  private _transaction: NodePgDatabase<any>;
  private _transactionPromise: Promise<unknown>;
  private _transactionCompletionPromise: PromiseWithResolvers<void>;

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
    this._transactionCompletionPromise.resolve();
    await Promise.allSettled([this._transactionPromise]);
    this._transaction = null;
    this._transactionPromise = null;
  }
  public async rollbackTransaction(): Promise<void> {
    this._transactionCompletionPromise.reject();
    await Promise.allSettled([this._transactionPromise]);
    this._transaction = null;
    this._transactionPromise = null;
  }
  public async startTransaction(): Promise<void> {
    const { promise: retrieveTransactionPromise, resolve: resolveRetrieveTransaction } =
      withResolvers<NodePgDatabase<any>>();

    this._transactionCompletionPromise = withResolvers<void>();

    this._transactionPromise = this._db.transaction(async (tx) => {
      resolveRetrieveTransaction(tx);
      const { promise } = this._transactionCompletionPromise;
      await promise;
    });

    this._transaction = await retrieveTransactionPromise;

    this.initRepositories();
  }

  private get dataSource() {
    return this._transaction ?? this._db;
  }

  private initRepositories() {
    this._userRepository = new DrizzleUserRepository(this.dataSource);
    this._paymentCustomerRepository = new DrizzlePaymentCustomerRepository(this.dataSource);
  }
}
