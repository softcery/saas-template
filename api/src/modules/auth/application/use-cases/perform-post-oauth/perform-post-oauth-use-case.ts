import { User } from '~modules/auth/domain/entities/user.entity';
import { UseCase } from '~shared/application/use-cases/use-case.abstract';

export interface IPerformPostOauthPayload {
  user: User;
}

export interface IPerformPostOauthUseCase extends UseCase<IPerformPostOauthPayload, void> {}
