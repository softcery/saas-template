import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EventDispatcher } from './application/events/event-dispatcher/implementation/event-dispatcher.interface';
import { AppConfigModel } from './application/models/app-config.model';
import { IEventIntegrationService } from './application/services/event-integration-service.interface';
import { BaseToken } from './constants';
import { DatabaseModule } from './infrastructure/database/database.module';
import { InMemoryEventIntegrationService } from './infrastructure/events/services/event-integration/in-memory/in-memory-event-integration.service';
import { validateConfig } from './infrastructure/util/validate-config';

@Global()
@Module({
  imports: [
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
    {
      provide: BaseToken.DOMAIN_EVENT_DISPATCHER,
      useFactory: (integrationService: IEventIntegrationService) => new EventDispatcher(integrationService),
      inject: [InMemoryEventIntegrationService],
    },
    {
      provide: BaseToken.INFRASTRUCTURE_EVENT_DISPATCHER,
      useFactory: (integrationService: IEventIntegrationService) => new EventDispatcher(integrationService),
      inject: [InMemoryEventIntegrationService],
    },
  ],
  exports: [BaseToken.APP_CONFIG],
})
export class SharedModule {}
