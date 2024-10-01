import { ConfigService } from '@nestjs/config';

import { AppConfigModel } from '../models/app-config.model';

export interface IAppConfigService extends ConfigService<AppConfigModel, true> {}
