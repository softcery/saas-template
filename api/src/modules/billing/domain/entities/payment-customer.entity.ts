import { plainToInstance } from 'class-transformer';

import { Subscription, SubscriptionStatus } from '~modules/billing/infrastructure/models/subscription.model';
import { Entity } from '~shared/domain/entities/entity';

import { PaymentCustomerPlan } from './payment-customer-subscription.entity';

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
  public name: string;
  public email: string;
  public userId: string;
  public providerCustomerId: string;
  public paymentPlan: PaymentCustomerPlan | null = null;
  public trialStartedAt: Date = null;
  public trialCanceledAt: Date = null;
  public subscriptionCanceledAt: Date = null;

  get hasActiveSubscription() {
    return !!(this.paymentPlan?.subscriptionStatus === SubscriptionStatus.Active);
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
    this.subscriptionCanceledAt = subscription.subscriptionCanceledAt;
    if (!this.paymentPlan) {
      this.paymentPlan = PaymentCustomerPlan.builder().build();
    }
    this.paymentPlan.planStartedAt = subscription.planStartedAt;
    this.paymentPlan.planEndsAt = subscription.planEndsAt;
    this.paymentPlan.subscriptionProviderId = subscription.providerId;
    this.paymentPlan.productProviderId = subscription.productProviderId;
    this.paymentPlan.subscriptionStatus = subscription.status;
  }

  public static fromOptions(options: IPaymentCustomerBase) {
    return plainToInstance(PaymentCustomer, options);
  }
}
