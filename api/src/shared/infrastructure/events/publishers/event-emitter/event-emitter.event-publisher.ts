import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { IEvent, IEventPublisher } from 'src/lib/nest-event-driven';

@Injectable()
export class EventEmitterEventPublisher implements IEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publish<E extends IEvent<object, any>>(event: E): void {
    this.eventEmitter.emitAsync(event.eventType, event);
  }
  publishAll<E extends IEvent<object, any>>(events: E[]): void {
    events.map((event) => this.publish(event));
  }
}
