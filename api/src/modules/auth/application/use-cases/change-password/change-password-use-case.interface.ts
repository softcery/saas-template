import { UseCase } from '~shared/application/use-case/use-case.interface';

import { UpdateUserPasswordDto } from '../../dto/update-user-password.dto';

export interface IChangePasswordPayload {
  updateDto: UpdateUserPasswordDto;
  userId: string;
}

export interface IChangePasswordUseCase extends UseCase<IChangePasswordPayload> {}
