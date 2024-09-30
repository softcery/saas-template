import { ClientException } from '~core/exceptions/domain/exceptions/client-exception/client.exception';

export class PasswordsNotMatchException extends ClientException {
  public static readonly CODE = 'PASSWORDS_NOT_MATCH';

  constructor() {
    super(PasswordsNotMatchException.CODE, 'Passwords not match');
  }
}
