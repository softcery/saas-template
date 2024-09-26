import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BillingModule } from './modules/billing/billing.module';

@Module({
  imports: [CoreModule, SharedModule, BillingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
