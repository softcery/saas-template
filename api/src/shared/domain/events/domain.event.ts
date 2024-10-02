import { IEvent } from 'src/lib/nest-event-driven';

import { DomainEventType } from '../enums/event-type.enum';

export abstract class DomainEvent<TPayload extends object> implements IEvent<TPayload, DomainEventType> {
  public abstract readonly eventType: DomainEventType;
  constructor(public readonly payload: Readonly<TPayload>) {}
}
