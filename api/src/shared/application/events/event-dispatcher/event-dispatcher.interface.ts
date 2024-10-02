import { IEvent } from 'src/lib/nest-event-driven';

export interface IEventDispatcher {
  registerEvent(event: IEvent): void;

  dispatchEvents(): void;
}
