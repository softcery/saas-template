import { Subject } from 'rxjs';

import { IEvent } from 'src/lib/nest-event-driven';

export interface IMessageSource<TEvent extends IEvent = IEvent> {
  bridgeEventsTo(subject: Subject<TEvent>): void;
}
