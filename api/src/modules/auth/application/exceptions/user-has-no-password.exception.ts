import { ClientException } from '~core/exceptions/domain/exceptions/client-exception/client.exception';

export class UserHasNoPasswordException extends ClientException {
  public static readonly CODE = 'USER_HAS_NO_PASSWORD';

  constructor() {
    super(
      UserHasNoPasswordException.CODE,
      'User has no password. Probably user is not registered or using another type of authentication',
    );
  }
}
