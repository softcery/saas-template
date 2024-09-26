import { Injectable } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate } from 'class-validator';
import Stripe from 'stripe';

import { Customer } from '../../models/customer.model';
import { StripeBaseMapper } from '../stripe-base-mapper/stripe-base.mapper';
import { StripeSubscriptionMapper } from '../stripe-subscription/stripe-subscription.mapper';

export class StripeCustomerMetadataShape {
  @IsDate()
  @Transform(({ value }) => (value as Date).toISOString(), { toPlainOnly: true })
  trialCanceledAt: Date;
  @IsBoolean()
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  hadTrial: boolean;
}

@Injectable()
export class StripeCustomerMapper extends StripeBaseMapper {
  constructor(private readonly stripeSubscriptionMapper: StripeSubscriptionMapper) {
    super();
  }

  public toDomain(stripeCustomer: Stripe.Customer, subscription: Stripe.Subscription | null = null): Customer {
    const paymentCustomerBuilder = Customer.builder(stripeCustomer.id, stripeCustomer.email).name(stripeCustomer.name);

    const metadata = this.parseMetadataToShape(StripeCustomerMetadataShape, stripeCustomer.metadata);

    paymentCustomerBuilder.hadTrial(metadata.hadTrial);
    paymentCustomerBuilder.trialCanceledAt(metadata.trialCanceledAt);

    if (subscription) {
      paymentCustomerBuilder.subscription(this.stripeSubscriptionMapper.toDomain(subscription));
    }

    return paymentCustomerBuilder.build();
  }
}
