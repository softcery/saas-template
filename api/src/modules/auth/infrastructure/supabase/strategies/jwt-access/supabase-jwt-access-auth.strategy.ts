import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { AuthGuardToken } from '~modules/auth/constants';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { SupabaseJwtAccessAuthStrategy as Strategy } from 'src/lib/passport-supabase';
import { ISupabaseJwtAccessAuthStrategyOptions } from 'src/lib/passport-supabase/strategies/jwt-access/supabase-jwt-access-auth.strategy';

@Injectable()
export class SupabaseJwtAccessAuthStrategy extends PassportStrategy(Strategy, AuthGuardToken.JWT_ACCESS) {
  constructor(@Inject(BaseToken.APP_CONFIG) appConfig: IAppConfigService) {
    const options: ISupabaseJwtAccessAuthStrategyOptions = {
      supabaseKey: appConfig.get('SUPABASE_SECRET_KEY'),
      supabaseUrl: appConfig.get('SUPABASE_URL'),
      // see https://github.com/mikenicholson/passport-jwt/blob/master/lib/extract_jwt.js for more extractors
      // you can even use full passport-jwt npm package to get access to those function, but I don't think that's relevant
      extractor: SupabaseJwtAccessAuthStrategy.fromAuthHeaderAsBearerToken(),
    };
    super(options);
  }

  private static fromAuthHeaderAsBearerToken() {
    return (request: Request) => {
      const AUTH_HEADER = 'authorization';
      const BEARER_AUTH_SCHEME = 'bearer';

      if (request.headers && request.headers[AUTH_HEADER]) {
        const authHeader = request.headers[AUTH_HEADER];
        const parts = authHeader.split(' ');

        if (parts.length === 2 && parts[0].toLowerCase() === BEARER_AUTH_SCHEME) {
          return parts[1];
        }
      }

      return null;
    };
  }
}
