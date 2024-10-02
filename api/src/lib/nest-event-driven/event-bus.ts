import { Injectable, OnModuleDestroy, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { EVENTS_HANDLER_METADATA } from './decorators/constants';
import { DefaultPubSub } from './default-pub-sub';
import { defaultGetEventName } from './helpers/default-get-event-name';
import { IEventBus } from './interfaces/event-bus.interface';
import { IEventHandler } from './interfaces/event-handler.interface';
import { IEventPublisher } from './interfaces/event-publisher.interface';
import { IEvent } from './interfaces/event.interface';
import { HandlerRegister } from './utils/handlers-register';
import { ObservableBus } from './utils/observable-bus';

export type EventHandlerType<TEvent extends IEvent = IEvent> = Type<IEventHandler<TEvent>>;

@Injectable()
export class EventBus<TEvent extends IEvent = IEvent>
  extends ObservableBus<TEvent>
  implements IEventBus<TEvent>, OnModuleDestroy
{
  protected getEventName: (event: TEvent) => string;
  protected readonly subscriptions: Subscription[];

  protected _pubsub: IEventPublisher;
  private handlersRegister: HandlerRegister<IEventHandler<TEvent>>;

  constructor(moduleRef: ModuleRef) {
    super();
    this.subscriptions = [];
    this.getEventName = defaultGetEventName;
    this.handlersRegister = new HandlerRegister<IEventHandler<TEvent>>(moduleRef, EVENTS_HANDLER_METADATA);
    this.useDefaultPubSub();
  }

  get publisher(): IEventPublisher {
    return this._pubsub;
  }

  set publisher(_publisher: IEventPublisher) {
    this._pubsub = _publisher;
  }

  onModuleDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  publish<T extends TEvent>(event: T) {
    return this._pubsub.publish(event);
  }

  publishAll<T extends TEvent>(events: T[]) {
    if (this._pubsub.publishAll) {
      return this._pubsub.publishAll(events);
    }
    return (events || []).map((event) => this._pubsub.publish(event));
  }

  bind(name: string) {
    const stream$ = name ? this.ofEventName(name) : this.subject$;
    const subscription = stream$.subscribe(async (event) => {
      const instances = await this.handlersRegister.get(event);
      instances.forEach((instance) => instance.handle(event));
    });
    this.subscriptions.push(subscription);
  }

  register(handlers: EventHandlerType<TEvent>[] = []) {
    handlers.forEach((handler) => this.registerHandler(handler));
  }

  protected registerHandler(handler: EventHandlerType<TEvent>) {
    if (this.handlersRegister.registerHandler(handler)) {
      const eventsNames = this.reflectEventsNames(handler);

      eventsNames.map((event) => this.bind(event.name));
    }
  }

  protected ofEventName(name: string) {
    return this.subject$.pipe(filter((event) => this.getEventName(event) === name));
  }

  private reflectEventsNames(handler: EventHandlerType<TEvent>): FunctionConstructor[] {
    return Reflect.getMetadata(EVENTS_HANDLER_METADATA, handler);
  }

  private useDefaultPubSub() {
    this._pubsub = new DefaultPubSub();
  }
}
