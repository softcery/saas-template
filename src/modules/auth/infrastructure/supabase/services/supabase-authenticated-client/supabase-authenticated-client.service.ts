import { Inject, Injectable, Scope } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { Session } from '~modules/auth/domain/value-objects/session.value';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { UnexpectedException } from 'src/core/exceptions/domain/exceptions/unexpected-exception/unexpected.exception';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseAuthenticatedClientService {
  private _supabaseClient: SupabaseClient;

  constructor(@Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService) {}

  public async authenticateWithSession(session: Session) {
    this.createClient();

    await this._supabaseClient.auth.setSession({
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
    });
  }

  public async authenticateWithAccessToken(accessToken: string) {
    this.createClient();

    await this._supabaseClient.auth.setSession({
      access_token: accessToken,
      // Providing access token instead of refresh to prevent error from supabase
      refresh_token: accessToken,
    });
  }

  private createClient() {
    this._supabaseClient = createClient(this.appConfig.get('SUPABASE_URL'), this.appConfig.get('SUPABASE_SECRET_KEY'), {
      auth: {
        autoRefreshToken: false,
      },
    });
  }

  public get client() {
    if (!this._supabaseClient) {
      throw new UnexpectedException('Current request does not authenticate supabase client');
    }
    return this._supabaseClient;
  }
}
