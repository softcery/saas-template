import { Inject, Injectable } from '@nestjs/common';

import { SubscriptionPlansMapper } from '~modules/billing/domain/mappers/subscription-plan/subscription-plans.mapper';
import { BillingDiToken } from '~modules/billing/infrastructure/stripe/constants';
import { Query } from '~shared/application/CQS/query.abstract';

import { SubscriptionPlanListDto } from '../../dto/subscription-plan-list.dto';
import { ISubscriptionPlanService } from '../../services/subscription-plan-service.interface';
import { IListSubscriptionPlansUseCase } from './list-subscription-plans-use-case.interface';

@Injectable()
export class ListSubscriptionPlansUseCase
  extends Query<void, SubscriptionPlanListDto>
  implements IListSubscriptionPlansUseCase
{
  constructor(
    @Inject(BillingDiToken.SUBSCRIPTION_PLANS_PROVIDER_SERVICE)
    private readonly subscriptionPlanService: ISubscriptionPlanService,
    private readonly subscriptionPlansMapper: SubscriptionPlansMapper,
  ) {
    super();
  }

  public async implementation(): Promise<SubscriptionPlanListDto> {
    const subscriptionPlans = await this.subscriptionPlanService.listPlans();
    return new SubscriptionPlanListDto(
      subscriptionPlans.map((subscriptionPlan) => this.subscriptionPlansMapper.toDto(subscriptionPlan)),
    );
  }
}
