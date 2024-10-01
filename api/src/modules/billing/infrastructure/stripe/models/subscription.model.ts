import { Builder } from 'builder-pattern';

export enum SubscriptionStatus {
  Incomplete = 'incomplete',
  IncompleteExpired = 'incomplete_expired',
  Trialing = 'trialing',
  Active = 'active',
  PastDue = 'past_due',
  Canceled = 'canceled',
  Unpaid = 'unpaid',
  Paused = 'paused',
}

export class Subscription {
  public providerId: string;
  public status: SubscriptionStatus;
  public trialStartedAt: Date = null;
  public trialEndsAt: Date = null;
  public planStartedAt: Date = null;
  public subscriptionCanceledAt: Date = null;
  public planEndsAt: Date = null;

  public static builder(id: string, status: SubscriptionStatus) {
    return Builder(Subscription, { providerId: id, status });
  }
}
