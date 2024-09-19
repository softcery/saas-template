import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigModel } from './application/models/app-config.model';
import { BaseToken } from './constants';
import { validateConfig } from './infrastructure/util/validate-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => validateConfig(config, AppConfigModel),
      ignoreEnvFile: false,
      envFilePath: ['./config/.env', './config/.env.local'],
    }),
  ],
  providers: [{ provide: BaseToken.APP_CONFIG, useClass: ConfigService }],
  exports: [BaseToken.APP_CONFIG],
})
export class SharedModule {}
