import { Inject, Injectable } from '@nestjs/common';

import { AuthDiToken } from '~modules/auth/constants';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { UseCase } from '~shared/application/use-case/use-case.interface';
import { BaseToken } from '~shared/constants';

import { SendResetPasswordConfirmationDto } from '../../dto/send-reset-password-confirmation.dto';
import { IAuthService } from '../../services/auth-service.interface';
import { ISendResetPasswordConfirmationUseCase } from './send-reset-password-confirmation-use-case.interface';

@Injectable()
export class SendResetPasswordConfirmationUseCase
  extends UseCase<SendResetPasswordConfirmationDto>
  implements ISendResetPasswordConfirmationUseCase
{
  constructor(
    @Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
  ) {
    super();
  }

  protected async implementation(): Promise<void> {
    await this.authService.sendResetPasswordEmail(
      this._input.email,
      this.appConfig.get('DD_PASSWORD_RESET_REDIRECT_URL'),
    );
  }
}
