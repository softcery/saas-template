import { IEvent } from 'src/lib/nest-event-driven';

import { IntegrationEventType } from './enums/event-type.enum';

export abstract class InfrastructureEvent<TPayload extends object> implements IEvent<TPayload, IntegrationEventType> {
  public abstract readonly eventType: IntegrationEventType;
  constructor(public readonly payload: Readonly<TPayload>) {}
}
