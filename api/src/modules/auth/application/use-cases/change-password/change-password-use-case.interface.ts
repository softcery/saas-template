import { UseCase } from '~shared/application/use-cases/use-case.interface';

import { UpdateUserPasswordDto } from '../../dto/update-user-password.dto';

export interface IChangePasswordPayload {
  updateDto: UpdateUserPasswordDto;
  userId: string;
}

export interface IChangePasswordUseCase extends UseCase<IChangePasswordPayload> {}
