import { Inject, Injectable } from '@nestjs/common';

import { AuthDiToken } from '~modules/auth/constants';
import { UserCreatedEvent } from '~modules/auth/domain/events/user-created.event';
import { UseCase } from '~shared/application/use-cases/use-case.abstract';

import { IAuthService } from '../../services/auth-service.interface';
import { IPerformPostOauthPayload, IPerformPostOauthUseCase } from './perform-post-oauth-use-case';

@Injectable()
export class PerformPostOAuthUseCase
  extends UseCase<IPerformPostOauthPayload, void>
  implements IPerformPostOauthUseCase
{
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
