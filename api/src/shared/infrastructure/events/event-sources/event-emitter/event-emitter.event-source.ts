import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Subject } from 'rxjs';

import { IEvent, IMessageSource } from 'src/lib/nest-event-driven';

@Injectable()
export class EventEmitterEventSource implements IMessageSource {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  bridgeEventsTo(subject: Subject<IEvent<object, any>>): void {
    this.eventEmitter.on('**', (event) => {
      subject.next(event);
    });
  }
}
