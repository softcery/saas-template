import { DomainEventType } from '~shared/domain/enums/event-type.enum';
import { DomainEvent } from '~shared/domain/events/domain.event';

import { User } from '../entities/user.entity';

export interface IUserEventPayload {
  user: User;
}

export class UserEvent<TPayload extends IUserEventPayload = IUserEventPayload> extends DomainEvent<TPayload> {
  public eventType: DomainEventType = DomainEventType.USER;
}
