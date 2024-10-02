import { Request } from 'express';

import { IAuthResult, JwtFromRequestFunction } from '../../core/types';
import { ISupabaseBaseAuthStrategyOptions, SupabaseBaseAuthStrategy } from '../base';

export interface ISupabaseBaseJwtRefreshAuthStrategyOptions extends ISupabaseBaseAuthStrategyOptions {
  extractor: JwtFromRequestFunction;
}

export class SupabaseJwtRefreshAuthStrategy extends SupabaseBaseAuthStrategy {
  constructor(private readonly options: ISupabaseBaseJwtRefreshAuthStrategyOptions) {
    super(options);
  }

  public async authenticate(req: Request): Promise<void> {
    const token = this.extractToken(req);
    const { data, error } = await this.supabaseClient.auth.refreshSession({ refresh_token: token });
    if (error) {
      this.fail(error, error.status);
      return;
    }

    const authResult: IAuthResult = {
      user: data.user,
      session: data.session,
      client: this.supabaseClient,
    };

    this.success(authResult);
  }

  public extractToken(req: unknown): string | null {
    const token = this.options.extractor(req);
    return token;
  }
}
