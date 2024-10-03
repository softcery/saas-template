import { PaymentCustomerPlan } from '~modules/billing/domain/entities/payment-customer-subscription.entity';
import { PaymentCustomerPlanPersistence } from '~shared/infrastructure/database/schema';

export class DrizzlePaymentCustomerPlanMapper {
  public static toPersistence(entity: PaymentCustomerPlan): PaymentCustomerPlanPersistence {
    return {
      ...entity,
    };
  }

  public static toDomain(persistence: PaymentCustomerPlanPersistence): PaymentCustomerPlan {
    return PaymentCustomerPlan.builder(persistence.id)
      .planEndsAt(persistence.planEndsAt)
      .planStartedAt(persistence.planStartedAt)
      .productProviderId(persistence.productProviderId)
      .subscriptionStatus(persistence.subscriptionStatus)
      .trialEndsAt(persistence.trialEndsAt)
      .build();
  }
}
