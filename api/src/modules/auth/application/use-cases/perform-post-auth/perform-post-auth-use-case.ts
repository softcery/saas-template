import { User } from '~modules/auth/domain/entities/user.entity';
import { IUseCase } from '~shared/application/use-cases/use-case.interface';

export interface IPerformPostAuthPayload {
  user: User;
}

export interface IPerformPostAuthUseCase extends IUseCase<IPerformPostAuthPayload, void> {}
