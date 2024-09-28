import { IEvent } from '../../../lib/nest-event-driven/interfaces/event.interface';

export interface IEventDispatcher {
  registerEvent(event: IEvent): void;

  dispatchEvents(): void;
}
