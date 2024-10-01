import { Injectable } from '@nestjs/common';
import { User as SupabaseUser } from '@supabase/supabase-js';

import { User } from '~modules/auth/domain/entities/user.entity';

@Injectable()
export class SupabaseUserMapper {
  public toDomain(supabaseUser: SupabaseUser): User {
    return User.builder(supabaseUser.id)
      .createdAt(supabaseUser.created_at ? new Date(supabaseUser.created_at) : undefined)
      .confirmationSentAt(supabaseUser.confirmation_sent_at ? new Date(supabaseUser.confirmation_sent_at) : undefined)
      .recoverySentAt(supabaseUser.recovery_sent_at ? new Date(supabaseUser.recovery_sent_at) : undefined)
      .emailChangeSentAt(supabaseUser.email_change_sent_at ? new Date(supabaseUser.email_change_sent_at) : undefined)
      .newEmail(supabaseUser.new_email)
      .newPhone(supabaseUser.new_phone)
      .invitedAt(supabaseUser.invited_at ? new Date(supabaseUser.invited_at) : undefined)
      .actionLink(supabaseUser.action_link)
      .email(supabaseUser.email)
      .phone(supabaseUser.phone)
      .confirmedAt(supabaseUser.confirmed_at)
      .emailConfirmedAt(supabaseUser.email_confirmed_at ? new Date(supabaseUser.email_confirmed_at) : undefined)
      .phoneConfirmedAt(supabaseUser.phone_confirmed_at ? new Date(supabaseUser.phone_confirmed_at) : undefined)
      .lastSignInAt(supabaseUser.last_sign_in_at)
      .role(supabaseUser.role)
      .updatedAt(supabaseUser.updated_at)
      .build();
  }
}
