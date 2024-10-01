import { UseCase } from '~shared/application/use-case/use-case.interface';

import { SubscriptionActionDto } from '../../dto/subscription-action.dto';

export interface ICancelSubscriptionPayload {
  userId: string;
}

export interface ICancelSubscriptionUseCase extends UseCase<ICancelSubscriptionPayload, SubscriptionActionDto> {}
