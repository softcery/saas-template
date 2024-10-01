import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Subject } from 'rxjs';

import { IMessageSource } from '~shared/application/events/event-subscriber.interface';

import { IEvent } from 'src/lib/nest-event-driven';

@Injectable()
export class EventEmitterEventSource implements IMessageSource {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  bridgeEventsTo(subject: Subject<IEvent<object, any>>): void {
    console.log('bridgeEventsTo');

    this.eventEmitter.on('*', (event) => {
      console.log('eventEmitter', event);

      subject.next(event);
    });
  }
}
