import { Injectable } from '@nestjs/common';

import { EventBus } from 'src/lib/nest-event-driven';

import { EventEmitterEventSource } from '../../../event-sources/event-emitter/event-emitter.event-source';
import { EventEmitterEventPublisher } from '../../../publishers/event-emitter/event-emitter.event-publisher';
import { EventBusBaseService } from '../base/event-bus-base.service';

@Injectable()
export class InMemoryEventIntegrationService extends EventBusBaseService {
  constructor(eventBus: EventBus, eventPublisher: EventEmitterEventPublisher, eventSource: EventEmitterEventSource) {
    super(eventBus, eventPublisher, eventSource);
  }
}
