import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EventDrivenModule } from 'src/lib/nest-event-driven/event-driven.module';

import { AppConfigModel } from './application/models/app-config.model';
import { BaseToken } from './constants';
import { EventEmitterEventSource } from './infrastructure/events/event-sources/event-emitter/event-emitter.event-source';
import { EventEmitterEventPublisher } from './infrastructure/events/publishers/event-emitter/event-emitter.event-publisher';
import { InMemoryEventIntegrationService } from './infrastructure/events/services/in-memory/in-memory-event-integration.service';
import { validateConfig } from './infrastructure/util/validate-config';

@Global()
@Module({
  imports: [
    EventDrivenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => validateConfig(config, AppConfigModel),
      ignoreEnvFile: false,
      envFilePath: ['./config/.env', './config/.env.local'],
    }),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
  ],
  providers: [
    { provide: BaseToken.APP_CONFIG, useClass: ConfigService },
    EventEmitterEventPublisher,
    EventEmitterEventSource,
    { provide: BaseToken.EVENT_INTEGRATION_SERVICE, useClass: InMemoryEventIntegrationService },
  ],
  exports: [BaseToken.APP_CONFIG, BaseToken.EVENT_INTEGRATION_SERVICE],
})
export class SharedModule implements OnApplicationBootstrap {
  public async onApplicationBootstrap() {}
}
