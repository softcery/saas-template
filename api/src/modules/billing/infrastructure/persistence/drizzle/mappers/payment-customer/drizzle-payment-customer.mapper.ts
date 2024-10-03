import { plainToInstance } from 'class-transformer';

import { IPaymentCustomerBase, PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';
import { PaymentCustomerPersistence } from '~shared/infrastructure/database/schema';

export class DrizzlePaymentCustomerMapper {
  public static toPersistence(entity: PaymentCustomer): PaymentCustomerPersistence {
    return {
      ...entity,
      customerPlanId: entity.paymentPlan?.id ?? null,
    };
  }

  public static toDomain(persistence: PaymentCustomerPersistence): PaymentCustomer {
    return plainToInstance(PaymentCustomer, persistence satisfies IPaymentCustomerBase);
  }
}
