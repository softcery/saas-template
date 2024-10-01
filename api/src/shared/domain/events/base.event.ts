import { IEvent } from 'src/lib/nest-event-driven';

import { EventType as DomainEventType } from '../enums/event-type.enum';

export abstract class Event<TPayload extends object> implements IEvent<TPayload, DomainEventType> {
  public abstract readonly eventType: DomainEventType;
  constructor(public readonly payload: Readonly<TPayload>) {}
}
