import { UseCase } from '~shared/application/use-case/use-case.interface';

import { ArrangeSubscriptionDto } from '../../dto/arrange-subscription.dto';
import { SubscriptionActionDto } from '../../dto/subscription-action.dto';

export interface IArrangeSubscriptionPayload {
  userId: string;
  arrangeSubscriptionDto: ArrangeSubscriptionDto;
}

export interface IArrangeSubscriptionUseCase extends UseCase<IArrangeSubscriptionPayload, SubscriptionActionDto> {}
