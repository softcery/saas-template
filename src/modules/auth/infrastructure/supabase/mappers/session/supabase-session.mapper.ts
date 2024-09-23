import { Injectable } from '@nestjs/common';
import { Session as SupabaseSession } from '@supabase/supabase-js';

import { Session } from '~modules/auth/domain/value-objects/session.value';

@Injectable()
export class SupabaseSessionMapper {
  toDomain(supabaseSession: SupabaseSession): Session {
    return new Session(
      supabaseSession.access_token,
      supabaseSession.refresh_token,
      supabaseSession.token_type,
      supabaseSession.expires_in,
      supabaseSession.provider_token ?? null,
      supabaseSession.provider_refresh_token ?? null,
      supabaseSession.expires_at ? new Date(supabaseSession.expires_at * 1000) : undefined,
    );
  }
}
