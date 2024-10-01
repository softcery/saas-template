import { Inject, Injectable } from '@nestjs/common';

import { AuthDiToken } from '~modules/auth/constants';
import { UseCase } from '~shared/application/use-case/use-case.interface';

import { UpdateUserEmailDto } from '../../dto/update-user-email.dto';
import { IAuthService } from '../../services/auth-service.interface';
import { IChangeEmailUseCase } from './change-email-use-case.interface';

@Injectable()
export class ChangeEmailUseCase extends UseCase<UpdateUserEmailDto> implements IChangeEmailUseCase {
  constructor(@Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService) {
    super();
  }

  protected async implementation(): Promise<void> {
    await this.authService.updateEmail(this._input.newEmail);
  }
}
