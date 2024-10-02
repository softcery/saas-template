import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EventDrivenModule } from 'src/lib/nest-event-driven/event-driven.module';

import { EventDispatcher } from './application/events/event-dispatcher/implementation/event-dispatcher.interface';
import { AppConfigModel } from './application/models/app-config.model';
import { IEventIntegrationService } from './application/services/event-integration-service.interface';
import { BaseToken } from './constants';
import { DatabaseModule } from './infrastructure/database/database.module';
import { EventEmitterEventSource } from './infrastructure/events/event-sources/event-emitter/event-emitter.event-source';
import { EventEmitterEventPublisher } from './infrastructure/events/publishers/event-emitter/event-emitter.event-publisher';
import { InMemoryEventIntegrationService } from './infrastructure/events/services/event-integration/in-memory/in-memory-event-integration.service';
import { validateConfig } from './infrastructure/util/validate-config';

@Global()
@Module({
  imports: [
    EventDrivenModule,
    EventEmitterModule.forRoot({ wildcard: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => validateConfig(config, AppConfigModel),
      ignoreEnvFile: false,
      envFilePath: ['./config/.env', './config/.env.local'],
    }),
    DatabaseModule,
  ],
  providers: [
    { provide: BaseToken.APP_CONFIG, useClass: ConfigService },
    InMemoryEventIntegrationService,
    EventEmitterEventPublisher,
    EventEmitterEventSource,
    {
      provide: BaseToken.EVENT_DISPATCHER,
      useFactory: (integrationService: IEventIntegrationService) => new EventDispatcher(integrationService),
      inject: [InMemoryEventIntegrationService],
    },
  ],
  exports: [BaseToken.APP_CONFIG, BaseToken.EVENT_DISPATCHER],
})
export class SharedModule {}
