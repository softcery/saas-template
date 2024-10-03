import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { IPaymentCustomerRepository } from '~modules/billing/application/repositories/payment-customer-repository.interface';
import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema, PaymentCustomerPersistence } from '~shared/infrastructure/database/schema';
import { paymentCustomer, paymentCustomerPlan } from '~shared/infrastructure/database/schema/public-database-schema';

import { DrizzlePaymentCustomerPlanMapper } from '../../mappers/payment-customer/drizzle-payment-customer-plan.mapper';
import { DrizzlePaymentCustomerMapper } from '../../mappers/payment-customer/drizzle-payment-customer.mapper';

const tableDefinition = TableDefinition.create(paymentCustomer, 'id');

export class DrizzlePaymentCustomerRepository
  extends DrizzleRepository<PaymentCustomer, typeof tableDefinition, PaymentCustomerPersistence>
  implements IPaymentCustomerRepository
{
  constructor(db: NodePgDatabase<MergedDbSchema>) {
    super(tableDefinition, db, DrizzlePaymentCustomerMapper);
  }

  public override async findById(id: string): Promise<PaymentCustomer> {
    const result = await this.db.query.paymentCustomer.findFirst({
      where: eq(paymentCustomer.id, id),
      with: {
        customerPlan: true,
      },
    });
    if (!result) return null;

    const domain = DrizzlePaymentCustomerMapper.toDomain(result);
    domain.paymentPlan = result.customerPlan && DrizzlePaymentCustomerPlanMapper.toDomain(result.customerPlan);
    return domain;
  }

  public async findByUserId(id: string): Promise<PaymentCustomer> {
    const result = await this.db.query.paymentCustomer.findFirst({
      where: eq(paymentCustomer.userId, id),
      with: {
        customerPlan: true,
      },
    });
    if (!result) return null;
    const domain = DrizzlePaymentCustomerMapper.toDomain(result);
    domain.paymentPlan = result.customerPlan && DrizzlePaymentCustomerPlanMapper.toDomain(result.customerPlan);
    return domain;
  }

  public async findByProviderId(id: string): Promise<PaymentCustomer> {
    const result = await this.db.query.paymentCustomer.findFirst({
      where: eq(paymentCustomer.providerCustomerId, id),
      with: {
        customerPlan: true,
      },
    });
    if (!result) return null;
    const domain = DrizzlePaymentCustomerMapper.toDomain(result);
    domain.paymentPlan = result.customerPlan && DrizzlePaymentCustomerPlanMapper.toDomain(result.customerPlan);
    return domain;
  }

  public override async create(entity: PaymentCustomer): Promise<PaymentCustomer> {
    const paymentCustomerPersistence = DrizzlePaymentCustomerMapper.toPersistence(entity);
    const paymentCustomerPlanPersistence =
      entity.paymentPlan && DrizzlePaymentCustomerPlanMapper.toPersistence(entity.paymentPlan);

    const id = await this.db.transaction(async (tx) => {
      const [result] = await tx
        .insert(paymentCustomer)
        .values(paymentCustomerPersistence)
        .returning({ id: paymentCustomer.id });
      if (paymentCustomerPlanPersistence) {
        await tx.insert(paymentCustomerPlan).values({ ...paymentCustomerPersistence, customerPlanId: result.id });
      }
      return result.id;
    });

    return this.findById(id);
  }

  public override async save(entity: PaymentCustomer): Promise<PaymentCustomer> {
    const paymentCustomerPersistence = DrizzlePaymentCustomerMapper.toPersistence(entity);
    const paymentCustomerPlanPersistence =
      entity.paymentPlan && DrizzlePaymentCustomerPlanMapper.toPersistence(entity.paymentPlan);

    const id = await this.db.transaction(async (tx) => {
      const [result] = await tx
        .insert(paymentCustomer)
        .values(paymentCustomerPersistence)
        .onConflictDoUpdate({ target: [paymentCustomer.id], set: paymentCustomerPersistence })
        .returning({ id: paymentCustomer.id });
      if (paymentCustomerPlanPersistence) {
        await tx
          .insert(paymentCustomerPlan)
          .values({ paymentCustomerPersistence, customerPlanId: result.id })
          .onConflictDoUpdate({
            target: [paymentCustomerPlan.id],
            set: { ...paymentCustomerPersistence, customerPlanId: result.id },
          });
      }
      return result.id;
    });

    return this.findById(id);
  }
}
