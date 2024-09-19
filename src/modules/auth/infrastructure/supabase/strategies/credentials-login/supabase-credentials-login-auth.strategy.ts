import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@supabase/supabase-js';

import { AuthGuardToken } from '~modules/auth/constants';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import {
  ISupabaseCredentialsAuthStrategyOptions,
  SupabaseCredentialsLoginAuthStrategy as Strategy,
} from 'src/lib/passport-supabase';

@Injectable()
export class SupabaseCredentialsLoginAuthStrategy extends PassportStrategy(
  Strategy,
  AuthGuardToken.SUPABASE_CREDENTIALS,
) {
  constructor(@Inject(BaseToken.APP_CONFIG) appConfig: IAppConfigService) {
    const options: ISupabaseCredentialsAuthStrategyOptions = {
      supabaseKey: appConfig.get('SUPABASE_SECRET_KEY'),
      supabaseUrl: appConfig.get('SUPABASE_URL'),
    };
    super(options);
  }

  async validate(user: User | null) {
    if (!user) throw new Error('Unauthorized user');
    return user;
  }
}
