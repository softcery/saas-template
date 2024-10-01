import { ClassConstructor, plainToInstance } from 'class-transformer';
import Stripe from 'stripe';

export abstract class StripeBaseMapper {
  protected parseStripeTimestamp(stripeTimestamp: number): Date {
    return new Date(stripeTimestamp * 1000);
  }

  protected parseNullableStripeTimestamp(stripeTimestamp: number | null): Date | null {
    if (stripeTimestamp === null) return null;
    return this.parseStripeTimestamp(stripeTimestamp);
  }

  protected parseMetadataToShape<T>(shape: ClassConstructor<T>, rawMetadata: Stripe.Metadata): T {
    return plainToInstance(shape, rawMetadata, { enableImplicitConversion: true });
  }
}
