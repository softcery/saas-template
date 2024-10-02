import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

@Injectable()
export class SupabaseClientService {
  private _supabaseClient: SupabaseClient;

  constructor(@Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService) {
    this._supabaseClient = createClient(this.appConfig.get('SUPABASE_URL'), this.appConfig.get('SUPABASE_SECRET_KEY'), {
      auth: {
        autoRefreshToken: false,
      },
    });
  }

  get client() {
    return this._supabaseClient;
  }
}
