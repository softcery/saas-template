import { SubscriptionStatus } from '~modules/billing/infrastructure/stripe/models/subscription.model';

export class PaymentCustomerDto {
  public name: string | null = null;
  public email: string | null = null;
  public subscriptionProductId: string | null = null;
  public trialStartedAt: number | null = null;
  public trialCanceledAt: number | null = null;
  public trialEndsAt: number | null = null;
  public planStartedAt: number | null = null;
  public subscriptionCanceledAt: number | null = null;
  public planEndsAt: number | null = null;
  public subscriptionStatus: SubscriptionStatus = null;
}
