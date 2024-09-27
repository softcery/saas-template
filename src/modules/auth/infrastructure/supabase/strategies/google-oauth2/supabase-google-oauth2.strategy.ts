import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthGuardToken } from '~modules/auth/constants';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import {
  ISupabaseGoogleOAuthStrategyOptions,
  SupabaseGoogleOAuth2Strategy as Strategy,
} from 'src/lib/passport-supabase/strategies';

@Injectable()
export class SupabaseGoogleOAuth2Strategy extends PassportStrategy(Strategy, AuthGuardToken.GOOGLE_OAUTH2) {
  constructor(@Inject(BaseToken.APP_CONFIG) appConfig: IAppConfigService) {
    const options: ISupabaseGoogleOAuthStrategyOptions = {
      clientId: appConfig.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: appConfig.get('GOOGLE_OAUTH_SECRET'),
      supabaseKey: appConfig.get('SUPABASE_SECRET_KEY'),
      supabaseUrl: appConfig.get('SUPABASE_URL'),
      callbackUrl: appConfig.get('GOOGLE_OAUTH_CALLBACK_URL'),
    };

    super(options);
  }
}
