import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { BillingModule } from './modules/billing/billing.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CoreModule, SharedModule, AuthModule, BillingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
