import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { ISupabaseBaseAuthStrategyOptions, SupabaseBaseAuthStrategy } from '../base/supabase-base-auth.strategy';

export interface ICredentials {
  phone: string;
  email: string;
  password: string;
}

export type CredentialsExtractor = (request: unknown) => ICredentials;

export interface ISupabaseCredentialsAuthStrategyOptions extends ISupabaseBaseAuthStrategyOptions {
  extractor?: CredentialsExtractor;
}

@Injectable()
export class SupabaseCredentialsLoginAuthStrategy extends SupabaseBaseAuthStrategy {
  constructor(private readonly options: ISupabaseCredentialsAuthStrategyOptions) {
    super(options);
  }

  public async authenticate(req: Request): Promise<void> {
    const credentials = this.extractCredentialsFromRequest(req);

    const { data, error } = await this.supabaseClient.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
      phone: credentials.phone,
    });

    if (error) {
      this.fail(error, error.status);
      return;
    }

    this.success(data.session);
  }

  private extractCredentialsFromRequest(request: unknown) {
    if (this.options.extractor) {
      return this.options.extractor(request);
    }
    return this.defaultExtractor(request as Request);
  }

  private defaultExtractor(request: Request): ICredentials {
    const body = request.body;
    return {
      email: body.email,
      password: body.password,
      phone: body.phone,
    };
  }
}
