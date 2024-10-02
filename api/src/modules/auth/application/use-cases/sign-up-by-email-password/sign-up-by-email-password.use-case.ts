import { Inject, Injectable } from '@nestjs/common';

import { AuthDiToken } from '~modules/auth/constants';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { UseCase } from '~shared/application/use-cases/use-case.abstract';
import { BaseToken } from '~shared/constants';

import { EmailPasswordCredentialsDto } from '../../dto/email-password-credentials.dto';
import { IAuthService } from '../../services/auth-service.interface';
import { ISignUpByEmailPasswordUseCase } from './sign-up-by-email-password-use-case.interface';

@Injectable()
export class SignUpByEmailPasswordUseCase
  extends UseCase<EmailPasswordCredentialsDto, void>
  implements ISignUpByEmailPasswordUseCase
{
  constructor(
    @Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
  ) {
    super();
  }

  protected async implementation(): Promise<void> {
    const { email, password } = this._input;

    await this.authService.signUpByEmailPassword(email, password, this.appConfig.get('DD_CLIENT_AUTH_REDIRECT_URL'));
  }
}
