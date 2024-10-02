import { Inject, Injectable } from '@nestjs/common';

import { AuthDiToken } from '~modules/auth/constants';
import { IDbContext } from '~shared/application/services/db-context.interface';
import { UseCase } from '~shared/application/use-cases/use-case.abstract';
import { BaseToken } from '~shared/constants';

import { PasswordsNotMatchException } from '../../exceptions/passwords-not-match.exception';
import { UserHasNoPasswordException } from '../../exceptions/user-has-no-password.exception';
import { IPasswordService } from '../../repositories/password-service.interface';
import { IAuthService } from '../../services/auth-service.interface';
import { IChangePasswordPayload, IChangePasswordUseCase } from './change-password-use-case.interface';

@Injectable()
export class ChangePasswordUseCase extends UseCase<IChangePasswordPayload> implements IChangePasswordUseCase {
  constructor(
    @Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(AuthDiToken.PASSWORD_SERVICE) private readonly passwordService: IPasswordService,
    @Inject(BaseToken.DB_CONTEXT) private readonly dbContext: IDbContext,
  ) {
    super();
  }

  protected async implementation(): Promise<void> {
    const hashedPassword = await this.dbContext.userRepository.findHashedPassword(this._input.userId);
    if (!hashedPassword) throw new UserHasNoPasswordException();

    const isPasswordMatching = await this.passwordService.confirm(this._input.updateDto.oldPassword, hashedPassword);
    if (!isPasswordMatching) throw new PasswordsNotMatchException();

    this.authService.updatePassword(this._input.updateDto.newPassword);
  }
}
