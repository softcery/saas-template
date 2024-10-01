import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { SubscriptionPrice } from '../../models/subscription-price.model';

@Injectable()
export class StripePriceMapper {
  public toModel(stripePrice: Stripe.Price): SubscriptionPrice {
    return new SubscriptionPrice(stripePrice.id, stripePrice.unit_amount, stripePrice.currency);
  }
}
