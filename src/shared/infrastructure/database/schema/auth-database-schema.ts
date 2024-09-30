import { sql } from 'drizzle-orm';
import {
  boolean,
  index,
  jsonb,
  pgSchema,
  smallint,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const auth = pgSchema('auth');

export const authUsers = auth.table(
  'users',
  {
    instanceId: uuid('instance_id'),
    id: uuid('id').primaryKey().notNull(),
    aud: varchar('aud', { length: 255 }),
    role: varchar('role', { length: 255 }),
    email: varchar('email', { length: 255 }),
    encryptedPassword: varchar('encrypted_password', { length: 255 }),
    emailConfirmedAt: timestamp('email_confirmed_at', { withTimezone: true, mode: 'date' }),
    invitedAt: timestamp('invited_at', { withTimezone: true, mode: 'date' }),
    confirmationToken: varchar('confirmation_token', { length: 255 }),
    confirmationSentAt: timestamp('confirmation_sent_at', { withTimezone: true, mode: 'date' }),
    recoveryToken: varchar('recovery_token', { length: 255 }),
    recoverySentAt: timestamp('recovery_sent_at', { withTimezone: true, mode: 'date' }),
    emailChangeTokenNew: varchar('email_change_token_new', { length: 255 }),
    emailChange: varchar('email_change', { length: 255 }),
    emailChangeSentAt: timestamp('email_change_sent_at', { withTimezone: true, mode: 'date' }),
    lastSignInAt: timestamp('last_sign_in_at', { withTimezone: true, mode: 'date' }),
    rawAppMetaData: jsonb('raw_app_meta_data'),
    rawUserMetaData: jsonb('raw_user_meta_data'),
    isSuperAdmin: boolean('is_super_admin'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }),
    phone: text('phone').default(null),
    phoneConfirmedAt: timestamp('phone_confirmed_at', { withTimezone: true, mode: 'date' }),
    phoneChange: text('phone_change').default(''),
    phoneChangeToken: varchar('phone_change_token', { length: 255 }).default(''),
    phoneChangeSentAt: timestamp('phone_change_sent_at', { withTimezone: true, mode: 'date' }),
    confirmedAt: timestamp('confirmed_at', { withTimezone: true, mode: 'date' }),
    emailChangeTokenCurrent: varchar('email_change_token_current', { length: 255 }).default(''),
    emailChangeConfirmStatus: smallint('email_change_confirm_status').default(0),
    bannedUntil: timestamp('banned_until', { withTimezone: true, mode: 'date' }),
    reauthenticationToken: varchar('reauthentication_token', { length: 255 }).default(''),
    reauthenticationSentAt: timestamp('reauthentication_sent_at', { withTimezone: true, mode: 'date' }),
    isSsoUser: boolean('is_sso_user').default(false).notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'date' }),
    isAnonymous: boolean('is_anonymous').default(false).notNull(),
  },
  (table) => {
    return {
      confirmationTokenIdx: uniqueIndex('confirmation_token_idx')
        .using('btree', table.confirmationToken)
        .where(sql`((confirmation_token)::text !~ '^[0-9 ]*$'::text)`),
      emailChangeTokenCurrentIdx: uniqueIndex('email_change_token_current_idx')
        .using('btree', table.emailChangeTokenCurrent)
        .where(sql`((email_change_token_current)::text !~ '^[0-9 ]*$'::text)`),
      emailChangeTokenNewIdx: uniqueIndex('email_change_token_new_idx')
        .using('btree', table.emailChangeTokenNew)
        .where(sql`((email_change_token_new)::text !~ '^[0-9 ]*$'::text)`),
      reauthenticationTokenIdx: uniqueIndex('reauthentication_token_idx')
        .using('btree', table.reauthenticationToken)
        .where(sql`((reauthentication_token)::text !~ '^[0-9 ]*$'::text)`),
      recoveryTokenIdx: uniqueIndex('recovery_token_idx')
        .using('btree', table.recoveryToken)
        .where(sql`((recovery_token)::text !~ '^[0-9 ]*$'::text)`),
      emailPartialKey: uniqueIndex('users_email_partial_key')
        .using('btree', table.email)
        .where(sql`(is_sso_user = false)`),
      instanceIdEmailIdx: index('users_instance_id_email_idx').using('btree', sql`instance_id`, sql`null`),
      instanceIdIdx: index('users_instance_id_idx').using('btree', table.instanceId),
      isAnonymousIdx: index('users_is_anonymous_idx').using('btree', table.isAnonymous),
      usersPhoneKey: unique('users_phone_key').on(table.phone),
    };
  },
);
