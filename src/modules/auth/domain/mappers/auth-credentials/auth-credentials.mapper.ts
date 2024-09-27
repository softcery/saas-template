import { Injectable } from '@nestjs/common';

import { TokensResultDto } from '~modules/auth/application/dto/tokens-result.dto';

import { Session } from '../../value-objects/session.value';

@Injectable()
export class AuthCredentialsMapper {
  public sessionToTokenResult(session: Session): TokensResultDto {
    return new TokensResultDto(session.accessToken, session.refreshToken);
  }
}
