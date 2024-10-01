import { IEvent } from 'src/lib/nest-event-driven';

export interface IEventIntegrationService {
  publishEvent(event: IEvent): void;
  publishEvents(event: IEvent[]): void;
}
