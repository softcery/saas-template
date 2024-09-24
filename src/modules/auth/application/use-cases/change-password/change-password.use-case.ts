import { Inject, Injectable } from '@nestjs/common';

import { AuthDiToken } from '~modules/auth/constants';
import { UseCase } from '~shared/application/use-case/use-case.interface';

import { UpdateUserPasswordDto } from '../../dto/update-user-password.dto';
import { PasswordsNotMatchException } from '../../exceptions/passwords-not-match.exception';
import { UserHasNoPasswordException } from '../../exceptions/user-has-no-password.exception';
import { IAuthService } from '../../services/auth-service.interface';
import { IChangePasswordUseCase } from './change-password-use-case.interface';

@Injectable()
export class ChangePasswordUseCase extends UseCase<UpdateUserPasswordDto> implements IChangePasswordUseCase {
  constructor(@Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService) {
    super();
  }

  protected async implementation(): Promise<void> {
    const userHasPassword = await this.authService.userHasPassword();
    if (!userHasPassword) throw new UserHasNoPasswordException();

    const isPasswordMatching = await this.authService.isPasswordMatching(this._input.oldPassword);
    if (!isPasswordMatching) throw new PasswordsNotMatchException();

    this.authService.updatePassword(this._input.newPassword);
  }
}
