import { Scope } from '@nestjs/common';

import { IEvent } from './event.interface';

export interface IEventHandlerOptions {
  events: (IEvent | (new (...args: any[]) => IEvent))[];

  scope?: Scope;
}

export interface IEventHandler<TEvent extends IEvent> {
  handle(event: TEvent): void;
}
