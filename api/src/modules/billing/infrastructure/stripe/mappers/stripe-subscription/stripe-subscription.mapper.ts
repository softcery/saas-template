import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { Subscription, SubscriptionStatus } from '../../../models/subscription.model';
import { StripeBaseMapper } from '../stripe-base-mapper/stripe-base.mapper';

@Injectable()
export class StripeSubscriptionMapper extends StripeBaseMapper {
  private readonly stripeStatusSubscriptionStatusRecord: Record<Stripe.Subscription.Status, SubscriptionStatus> = {
    active: SubscriptionStatus.Active,
    canceled: SubscriptionStatus.Canceled,
    incomplete: SubscriptionStatus.Incomplete,
    incomplete_expired: SubscriptionStatus.IncompleteExpired,
    past_due: SubscriptionStatus.PastDue,
    paused: SubscriptionStatus.Paused,
    trialing: SubscriptionStatus.Trialing,
    unpaid: SubscriptionStatus.Unpaid,
  };

  public toDomain(stripeSubscription: Stripe.Subscription): Subscription {
    const productId = stripeSubscription.items.data.at(0).plan.product.toString();

    return Subscription.builder(
      stripeSubscription.id,
      this.mapStripeStatusToDomain(stripeSubscription.status),
      productId,
    )
      .planEndsAt(this.parseNullableStripeTimestamp(stripeSubscription.cancel_at))
      .planStartedAt(this.parseNullableStripeTimestamp(stripeSubscription.start_date))
      .subscriptionCanceledAt(this.parseNullableStripeTimestamp(stripeSubscription.canceled_at))
      .build();
  }

  private mapStripeStatusToDomain(status: Stripe.Subscription.Status): SubscriptionStatus {
    return this.stripeStatusSubscriptionStatusRecord[status];
  }
}
