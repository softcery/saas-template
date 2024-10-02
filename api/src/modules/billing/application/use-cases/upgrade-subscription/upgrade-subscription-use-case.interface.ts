import { UseCase } from '~shared/application/use-cases/use-case.interface';

import { SubscriptionActionDto } from '../../dto/subscription-action.dto';

export interface IUpgradeSubscriptionPayload {
  userId: string;
}

export interface IUpgradeSubscriptionUseCase extends UseCase<IUpgradeSubscriptionPayload, SubscriptionActionDto> {}
