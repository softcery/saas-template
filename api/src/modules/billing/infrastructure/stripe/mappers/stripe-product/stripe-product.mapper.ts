import { Injectable } from '@nestjs/common';
import { Transform } from 'class-transformer';
import Stripe from 'stripe';

import { PlanQuota } from '~modules/billing/domain/value-objects/plan-quota.value';

import { SubscriptionProduct } from '../../../models/subscription-product.model';
import { StripeBaseMapper } from '../stripe-base-mapper/stripe-base.mapper';

class StripeQuotaPersistance {
  balance: number;
}

class StripePlanMetadataShape {
  @Transform(({ value }) => JSON.parse(value))
  quota: StripeQuotaPersistance;
  isTrialAllowed: boolean;
}

@Injectable()
export class StripeProductMapper extends StripeBaseMapper {
  public toModel(stripeProduct: Stripe.Product): SubscriptionProduct {
    const parsedMetadata = this.parseMetadataToShape(StripePlanMetadataShape, stripeProduct.metadata);

    return SubscriptionProduct.builder(
      stripeProduct.id,
      stripeProduct.name,
      this.quotaPersistanceToModel(parsedMetadata.quota),
    )
      .description(stripeProduct.description)
      .features(stripeProduct.marketing_features.map((feature) => feature.name))
      .isTrialAllowed(parsedMetadata.isTrialAllowed)
      .build();
  }

  private quotaPersistanceToModel(stripePlanQuotaPersistance: StripeQuotaPersistance): PlanQuota {
    return new PlanQuota(stripePlanQuotaPersistance.balance);
  }
}
