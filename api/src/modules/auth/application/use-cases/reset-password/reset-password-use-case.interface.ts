import { User } from '~modules/auth/domain/entities/user.entity';
import { UseCase } from '~shared/application/use-cases/use-case.interface';

export interface IResetPasswordPayload {
  user: User;
  newPassword: string;
}

export interface IResetPasswordUseCase extends UseCase<IResetPasswordPayload> {}
