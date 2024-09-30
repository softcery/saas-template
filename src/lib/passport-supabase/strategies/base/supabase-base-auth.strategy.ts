import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Strategy } from 'passport-strategy';

import { ISupabaseClientOptions } from '../../core';

export interface ISupabaseBaseAuthStrategyOptions extends ISupabaseClientOptions {}

export abstract class SupabaseBaseAuthStrategy extends Strategy {
  private readonly _supabaseClient: SupabaseClient;

  constructor(options: ISupabaseBaseAuthStrategyOptions) {
    super();
    this._supabaseClient = createClient(options.supabaseUrl, options.supabaseKey);
  }

  protected get supabaseClient() {
    return this._supabaseClient;
  }
}
