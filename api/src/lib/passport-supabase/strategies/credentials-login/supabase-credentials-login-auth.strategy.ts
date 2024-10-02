import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { IAuthResult } from '../../core/types';
import { ISupabaseBaseAuthStrategyOptions, SupabaseBaseAuthStrategy } from '../base/supabase-base-auth.strategy';

export interface IEmailPasswordCredentials {
  email: string;
  password: string;
}

export interface IPhonePasswordCredentials {
  phone: string;
  password: string;
}

export interface ICredentials {
  email?: string;
  phone?: string;
  password: string;
}

export type CredentialsExtractor = (request: unknown) => ICredentials | Promise<ICredentials>;

export interface ISupabaseCredentialsAuthStrategyOptions extends ISupabaseBaseAuthStrategyOptions {
  extractor?: CredentialsExtractor;
}

@Injectable()
export class SupabaseCredentialsLoginAuthStrategy extends SupabaseBaseAuthStrategy {
  constructor(private readonly options: ISupabaseCredentialsAuthStrategyOptions) {
    super(options);
  }

  public async authenticate(req: Request): Promise<void> {
    try {
      const credentials = await this.extractCredentialsFromRequest(req);

      const { data, error } = await this.supabaseClient.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
        phone: credentials.phone,
      });

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
    } catch (error) {
      this.error(error);
    }
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
