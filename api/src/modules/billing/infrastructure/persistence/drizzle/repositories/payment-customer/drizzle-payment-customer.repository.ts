import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { IPaymentCustomerRepository } from '~modules/billing/application/repositories/payment-customer-repository.interface';
import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema, PaymentCustomerPersistence } from '~shared/infrastructure/database/schema';
import { paymentCustomer } from '~shared/infrastructure/database/schema/public-database-schema';

import { DrizzlePaymentCustomerMapper } from '../../mappers/payment-customer/drizzle-payment-customer.mapper';

const tableDefinition = TableDefinition.create(paymentCustomer, 'id');

export class DrizzlePaymentCustomerRepository
  extends DrizzleRepository<PaymentCustomer, typeof tableDefinition, PaymentCustomerPersistence>
  implements IPaymentCustomerRepository
{
  constructor(db: NodePgDatabase<MergedDbSchema>) {
    super(tableDefinition, db, DrizzlePaymentCustomerMapper);
  }

  public async findByUserId(id: string): Promise<PaymentCustomer> {
    const result = await this.db.query.paymentCustomer.findFirst({ where: eq(paymentCustomer.userId, id) });
    if (!result) return null;
    return DrizzlePaymentCustomerMapper.toDomain(result);
  }

  public async findByProviderId(id: string): Promise<PaymentCustomer> {
    const result = await this.db.query.paymentCustomer.findFirst({ where: eq(paymentCustomer.providerCustomerId, id) });
    if (!result) return null;
    return DrizzlePaymentCustomerMapper.toDomain(result);
  }
}
