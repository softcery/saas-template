import { SetMetadata } from '@nestjs/common';

import { AuthMetadataKey } from '~modules/auth/constants';

export const PublicRoute = () => SetMetadata(AuthMetadataKey.IS_PUBLIC_METADATA, true);
