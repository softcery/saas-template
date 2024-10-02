import { SubscriptionPrice } from './subscription-price.model';
import { SubscriptionProduct } from './subscription-product.model';

export class SubscriptionPlan {
  constructor(
    public product: SubscriptionProduct,
    public price: SubscriptionPrice,
  ) {}
}
