import { Inject, Injectable } from '@nestjs/common';

import { AuthDiToken } from '~modules/auth/constants';
import { UserCreatedEvent } from '~modules/auth/domain/events/user-created.event';
import { UseCase } from '~shared/application/use-cases/use-case.abstract';

import { IAuthService } from '../../services/auth-service.interface';
import { IPerformPostAuthPayload, IPerformPostAuthUseCase } from './perform-post-auth-use-case';

@Injectable()
export class PerformPostAuthUseCase extends UseCase<IPerformPostAuthPayload, void> implements IPerformPostAuthUseCase {
  constructor(@Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService) {
    super();
  }

  protected async implementation(): Promise<void> {
    const { user } = this._input;
    if (user.signUpCompleted) return;

    this._eventDispatcher.registerEvent(new UserCreatedEvent({ user }));
    await this.authService.markSignUpFinished();
  }
}
