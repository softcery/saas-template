import { IMessageSource } from '~shared/application/events/event-subscriber.interface';
import { IEventIntegrationService } from '~shared/application/services/event-integration-service.interface';

import { IEvent, IEventBus, IEventPublisher } from 'src/lib/nest-event-driven';

export abstract class EventBusBaseService implements IEventIntegrationService {
  constructor(
    private readonly local: IEventBus,
    private readonly publisher: IEventPublisher,
    subscriber: IMessageSource,
  ) {
    subscriber.bridgeEventsTo(this.local.subject$);
  }

  publishEvent(event: IEvent): void {
    console.log('publishEvent', event);
    this.publisher.publish(event);
  }

  publishEvents(event: IEvent[]): void {
    this.publisher.publishAll(event);
  }
}
