import { UseCase } from '~shared/application/use-cases/use-case.abstract';

import { SubscriptionActionDto } from '../../dto/subscription-action.dto';

export interface ICancelSubscriptionPayload {
  userId: string;
}

export interface ICancelSubscriptionUseCase extends UseCase<ICancelSubscriptionPayload, SubscriptionActionDto> {}
