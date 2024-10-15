import { Builder } from 'builder-pattern';

import { Subscription, SubscriptionStatus } from './subscription.model';

abstract class CustomerState {
  constructor(protected paymentCustomer: Customer) {}

  abstract get canSubscribe(): boolean;

  public init() {}
  public exit() {}
}

class SubscribedCustomerState extends CustomerState {
  get canSubscribe() {
    return false;
  }
}

class NotSubscribedCustomerState extends CustomerState {
  get canSubscribe() {
    return true;
  }
}

export class Customer {
  private readonly subscribedCustomerState: SubscribedCustomerState;
  private readonly notSubscribedCustomerState: NotSubscribedCustomerState;

  constructor() {
    this.subscribedCustomerState = new SubscribedCustomerState(this);
    this.notSubscribedCustomerState = new NotSubscribedCustomerState(this);
  }

  public providerId: string;
  public email: string;
  public hadTrial = false;
  public name: string | null = null;
  public trialCanceledAt: Date | null = null;
  public subscription: Subscription | null = null;

  private get state(): CustomerState {
    if (!this.subscription) {
      return this.notSubscribedCustomerState;
    }
    return this.subscribedCustomerState;
  }

  get hasSubscription() {
    return !!this.subscription;
  }

  get hasTrial() {
    return this.hasSubscription && this.subscription.status === SubscriptionStatus.Trialing;
  }

  get canSubscribe() {
    return this.state.canSubscribe;
  }

  get subscriptionCanceled(): boolean {
    return this.hasSubscription && this.subscription.status === SubscriptionStatus.Canceled;
  }

  get canUseTrial() {
    return !this.hadTrial;
  }

  public static builder(id: string, email: string) {
    return Builder(Customer, { providerId: id, email });
  }
}
