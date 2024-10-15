import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { SubscriptionPlanDto } from '~modules/billing/application/dto/subscription-plan.dto';
import { SubscriptionPlan } from '~modules/billing/infrastructure/models/subscription-plan.model';

@Injectable()
export class SubscriptionPlansMapper {
  public toDto(subscriptionPlan: SubscriptionPlan): SubscriptionPlanDto {
    return plainToInstance(SubscriptionPlanDto, {
      currency: subscriptionPlan.price.currency,
      description: subscriptionPlan.product.description,
      features: subscriptionPlan.product.features,
      productId: subscriptionPlan.product.providerId,
      name: subscriptionPlan.product.name,
      price: subscriptionPlan.price.decimalPrice,
      isTrialAllowed: subscriptionPlan.product.isTrialAllowed,
    } satisfies SubscriptionPlanDto);
  }
}
