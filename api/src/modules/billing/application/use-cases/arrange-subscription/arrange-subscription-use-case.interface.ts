import { UseCase } from '~shared/application/use-cases/use-case.abstract';

import { ArrangeSubscriptionDto } from '../../dto/arrange-subscription.dto';
import { SubscriptionActionDto } from '../../dto/subscription-action.dto';

export interface IArrangeSubscriptionPayload {
  userId: string;
  arrangeSubscriptionDto: ArrangeSubscriptionDto;
}

export interface IArrangeSubscriptionUseCase extends UseCase<IArrangeSubscriptionPayload, SubscriptionActionDto> {}
