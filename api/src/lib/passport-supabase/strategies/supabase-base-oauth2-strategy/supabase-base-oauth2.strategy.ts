import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { IOAuth2StrategyOptions, OAuth2Strategy } from 'src/lib/passport-oauth';

import { ISupabaseClientOptions } from '../../core';

export interface ISupabaseBaseOauthStrategyOptions extends ISupabaseClientOptions {
  oauth: IOAuth2StrategyOptions;
}

export abstract class SupabaseBaseOauth2Strategy<
  Params extends object = object,
  Profile extends object = object,
> extends OAuth2Strategy<Params, Profile> {
  private readonly _supabaseClient: SupabaseClient;

  constructor(options: ISupabaseBaseOauthStrategyOptions) {
    super(options.oauth);
    this._supabaseClient = createClient(options.supabaseUrl, options.supabaseKey);
  }

  protected get supabaseClient() {
    return this._supabaseClient;
  }
}
