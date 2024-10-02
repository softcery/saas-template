import { plainToInstance } from 'class-transformer';

import { Subscription, SubscriptionStatus } from '~modules/billing/infrastructure/stripe/models/subscription.model';
import { Entity } from '~shared/domain/entities/entity';

export interface IPaymentCustomerBase {
  providerCustomerId: string;
  userId: string;
  name: string;
  email: string;
  subscriptionProviderId?: string | null;
  trialStartedAt?: Date;
  trialCanceledAt?: Date;
  trialEndsAt?: Date;
  planStartedAt?: Date;
  subscriptionCanceledAt?: Date;
  planEndsAt?: Date;
  subscriptionStatus?: SubscriptionStatus;
}

export class PaymentCustomer extends Entity<string> implements IPaymentCustomerBase {
  public providerCustomerId: string;
  public userId: string;
  public name: string;
  public email: string;
  public subscriptionProviderId: string | null = null;
  public trialStartedAt: Date = null;
  public trialCanceledAt: Date = null;
  public trialEndsAt: Date = null;
  public planStartedAt: Date = null;
  public subscriptionCanceledAt: Date = null;
  public planEndsAt: Date = null;
  public subscriptionStatus: SubscriptionStatus = null;

  get hasActiveSubscription() {
    return !!this.subscriptionProviderId;
  }

  get hasTrial() {
    return !!this.trialCanceledAt && !this.trialStartedAt;
  }

  get canSubscribe() {
    return !this.hasActiveSubscription;
  }

  get subscriptionCanceled(): boolean {
    return !!this.subscriptionCanceledAt;
  }

  get canUseTrial() {
    return !this.trialStartedAt;
  }

  public updateSubscriptionDetails(subscription: Subscription) {
    this.planStartedAt = subscription.planStartedAt;
    this.planEndsAt = subscription.planEndsAt;
    this.subscriptionCanceledAt = subscription.subscriptionCanceledAt;
    this.subscriptionProviderId = subscription.providerId;
  }

  public static fromOptions(options: IPaymentCustomerBase) {
    return plainToInstance(PaymentCustomer, options);
  }
}
