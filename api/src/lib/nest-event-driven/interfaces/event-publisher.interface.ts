import { IEvent } from './event.interface';

export interface IEventPublisher<TEvent extends IEvent = IEvent> {
  publish<E extends TEvent>(event: E): void;

  publishAll<E extends TEvent>(events: E[]): void;
}
