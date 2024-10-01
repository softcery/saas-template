import { Subject } from 'rxjs';

import { IEvent } from './event.interface';

export interface IEventBus<TEvent extends IEvent = IEvent> {
  subject$: Subject<TEvent>;
  publish<T extends TEvent>(event: T): void;
  publishAll(events: TEvent[]): void;
}
