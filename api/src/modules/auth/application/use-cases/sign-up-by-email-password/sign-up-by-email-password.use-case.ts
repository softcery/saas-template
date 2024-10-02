import { Inject, Injectable } from '@nestjs/common';

import { AuthDiToken } from '~modules/auth/constants';
import { UseCase } from '~shared/application/use-cases/use-case.interface';

import { EmailPasswordCredentialsDto } from '../../dto/email-password-credentials.dto';
import { IAuthService } from '../../services/auth-service.interface';
import { ISignUpByEmailPasswordUseCase } from './sign-up-by-email-password-use-case.interface';

@Injectable()
export class SignUpByEmailPasswordUseCase
  extends UseCase<EmailPasswordCredentialsDto, void>
  implements ISignUpByEmailPasswordUseCase
{
  constructor(@Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService) {
    super();
  }

  protected async implementation(): Promise<void> {
    const { email, password } = this._input;

    await this.authService.signUpByEmailPassword(email, password);
  }
}
