import { Subject } from 'rxjs';

import { IEvent, IEventPublisher, IMessageSource } from './interfaces';

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
