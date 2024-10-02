import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { AuthGuardToken } from '~modules/auth/constants';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import {
  ISupabaseBaseJwtRefreshAuthStrategyOptions,
  SupabaseJwtRefreshAuthStrategy as Strategy,
} from 'src/lib/passport-supabase';

@Injectable()
export class SupabaseJwtRefreshAuthStrategy extends PassportStrategy(Strategy, AuthGuardToken.JWT_REFRESH) {
  constructor(@Inject(BaseToken.APP_CONFIG) appConfig: IAppConfigService) {
    const options: ISupabaseBaseJwtRefreshAuthStrategyOptions = {
      supabaseKey: appConfig.get('SUPABASE_SECRET_KEY'),
      supabaseUrl: appConfig.get('SUPABASE_URL'),
      extractor: SupabaseJwtRefreshAuthStrategy.fromBody('refreshToken'),
    };
    super(options);
  }

  private static fromBody(fieldName: string) {
    return (request: Request) => {
      if (request.body && request.body[fieldName]) {
        return request.body[fieldName];
      }
      return null;
    };
  }
}
