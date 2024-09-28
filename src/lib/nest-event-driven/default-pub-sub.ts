import { Subject } from 'rxjs';

import { IMessageSource } from '~shared/application/events/event-subscriber.interface';

import { IEvent, IEventPublisher } from './interfaces';

export class DefaultPubSub<TEvent extends IEvent> implements IEventPublisher<TEvent>, IMessageSource<TEvent> {
  private subject$: Subject<TEvent>;

  publishAll<E extends TEvent>(events: E[]): void {
    events.forEach((event) => this.publish(event));
  }

  publish<E extends TEvent>(event: E) {
    this.subject$.next(event);
  }

  bridgeEventsTo(subject: Subject<TEvent>) {
    this.subject$ = subject;
  }
}
