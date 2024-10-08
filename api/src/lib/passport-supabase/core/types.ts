import { Session, SupabaseClient, User } from '@supabase/supabase-js';

export interface IAuthResult {
  user: User | null;
  session: Session | null;
  accessToken?: string;
  authorizedClient?: SupabaseClient;
}
// from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/48317a932144cd7976a75edd79eaf73210aa603e/types/passport-jwt/index.d.ts#L108
export interface JwtFromRequestFunction<T = any> {
  (req: T): string | null;
}

export interface ISupabaseClientOptions {
  supabaseUrl: string;
  supabaseKey: string;
}
