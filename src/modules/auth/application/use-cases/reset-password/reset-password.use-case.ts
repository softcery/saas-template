import { Inject, Injectable } from '@nestjs/common';

import { AuthDiToken } from '~modules/auth/constants';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { UseCase } from '~shared/application/use-case/use-case.interface';
import { BaseToken } from '~shared/constants';

import { PasswordRecoveryTimeExceededException } from '../../exceptions/password-recovery-time-exceeded.exception';
import { UserHasNoPasswordException } from '../../exceptions/user-has-no-password.exception';
import { IAuthService } from '../../services/auth-service.interface';
import { IResetPasswordPayload, IResetPasswordUseCase } from './reset-password-use-case.interface';

@Injectable()
export class ResetPasswordUseCase extends UseCase<IResetPasswordPayload> implements IResetPasswordUseCase {
  constructor(
    @Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
  ) {
    super();
  }

  protected async implementation(): Promise<void> {
    const userHasPassword = await this.authService.userHasPassword();
    if (!userHasPassword) throw new UserHasNoPasswordException();

    const isPasswordRecoveryTimeInRange = this._input.user.isPasswordRecoveryWithinTime(
      this.appConfig.get('DD_PASSWORD_RECOVERY_TIME'),
    );

    if (!isPasswordRecoveryTimeInRange) {
      throw new PasswordRecoveryTimeExceededException();
    }

    await this.authService.updatePassword(this._input.newPassword);
  }
}
