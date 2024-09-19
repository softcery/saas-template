import { Request } from 'express';

import { IAuthResult } from '../../core/types';
import { ISupabaseBaseAuthStrategyOptions, SupabaseBaseAuthStrategy } from '../base';

export interface ISupabaseJwtAccessAuthStrategyOptions extends ISupabaseBaseAuthStrategyOptions {
  extractor: JwtFromRequestFunction;
}

// from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/48317a932144cd7976a75edd79eaf73210aa603e/types/passport-jwt/index.d.ts#L108
export interface JwtFromRequestFunction<T = any> {
  (req: T): string | null;
}

export class SupabaseJwtAccessAuthStrategy extends SupabaseBaseAuthStrategy {
  constructor(private readonly options: ISupabaseJwtAccessAuthStrategyOptions) {
    super(options);
  }

  public async authenticate(req: Request): Promise<void> {
    const token = this.extractToken(req);
    const { data, error } = await this.supabaseClient.auth.getUser(token);
    if (error) {
      this.fail(error, error.status);
      return;
    }

    const authResult: IAuthResult = {
      user: data.user,
      session: null,
    };

    this.success(authResult);
  }

  public extractToken(req: unknown): string | null {
    const token = this.options.extractor(req);
    return token;
  }
}
