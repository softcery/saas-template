import { Session, User } from '@supabase/supabase-js';

export interface IAuthResult {
  user: User | null;
  session: Session | null;
}
// from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/48317a932144cd7976a75edd79eaf73210aa603e/types/passport-jwt/index.d.ts#L108
export interface JwtFromRequestFunction<T = any> {
  (req: T): string | null;
}

export interface ISupabaseClientOptions {
  supabaseUrl: string;
  supabaseKey: string;
}
