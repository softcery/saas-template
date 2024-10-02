import { User } from '~modules/auth/domain/entities/user.entity';
import { UseCase } from '~shared/application/use-cases/use-case.abstract';

export interface IPerformPostAuthPayload {
  user: User;
}

export interface IPerformPostAuthUseCase extends UseCase<IPerformPostAuthPayload, void> {}
