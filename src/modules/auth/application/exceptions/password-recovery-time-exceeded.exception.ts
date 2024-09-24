import { ClientException } from '~core/exceptions/domain/exceptions/client-exception/client.exception';

export class PasswordRecoveryTimeExceededException extends ClientException {
  public static readonly CODE = 'PASSWORD_RECOVERY_TIME_EXCEEDED';

  constructor() {
    super(PasswordRecoveryTimeExceededException.CODE, 'Password recovery time exceeded');
  }
}
