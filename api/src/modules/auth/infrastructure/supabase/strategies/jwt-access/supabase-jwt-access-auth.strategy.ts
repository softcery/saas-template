import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';

import { AuthGuardToken } from '~modules/auth/constants';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { IAuthResult } from 'src/lib/passport-supabase';

@Injectable()
export class SupabaseJwtAccessAuthStrategy extends PassportStrategy(Strategy, AuthGuardToken.JWT_ACCESS) {
  constructor(@Inject(BaseToken.APP_CONFIG) appConfig: IAppConfigService) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.get('JWT_SECRET'),
    };
    super(options, (payload: SupabaseUser, done: VerifiedCallback) => {
      const result: IAuthResult = {
        user: payload,
        session: null,
      };

      done(null, result);
    });
  }
}
