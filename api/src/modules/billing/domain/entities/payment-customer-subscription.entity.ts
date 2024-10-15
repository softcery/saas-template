import { Builder } from 'builder-pattern';

import { SubscriptionStatus } from '~modules/billing/infrastructure/models/subscription.model';
import { Entity } from '~shared/domain/entities/entity';

export class PaymentCustomerPlan extends Entity<string> {
  public productProviderId: string;
  public subscriptionProviderId: string | null = null;
  public planStartedAt: Date | null = null;
  public planEndsAt: Date | null = null;
  public trialEndsAt: Date | null = null;
  public subscriptionStatus: SubscriptionStatus = null;

  public static builder(id?: string) {
    return Builder(PaymentCustomerPlan, { id });
  }
}
