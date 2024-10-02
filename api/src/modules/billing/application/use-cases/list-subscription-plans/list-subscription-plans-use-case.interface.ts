import { UseCase } from '~shared/application/use-cases/use-case.interface';

import { SubscriptionPlanListDto } from '../../dto/subscription-plan-list.dto';

export interface IListSubscriptionPlansUseCase extends UseCase<void, SubscriptionPlanListDto> {}
