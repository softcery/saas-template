import { IUseCase } from '~shared/application/use-cases/use-case.interface';

import { SubscriptionActionDto } from '../../dto/subscription-action.dto';

export interface ICancelSubscriptionPayload {
  userId: string;
}

export interface ICancelSubscriptionUseCase extends IUseCase<ICancelSubscriptionPayload, SubscriptionActionDto> {}
