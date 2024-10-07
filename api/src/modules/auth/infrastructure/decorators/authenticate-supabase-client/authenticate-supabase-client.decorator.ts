import { SetMetadata } from '@nestjs/common';

import { AuthMetadataKey } from '~modules/auth/constants';

export const AuthenticateSupabaseClient = () => SetMetadata(AuthMetadataKey.AUTHENTICATE_SUPABASE_CLIENT, true);
