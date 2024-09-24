import { UseCase } from '~shared/application/use-case/use-case.interface';

import { UpdateUserPasswordDto } from '../../dto/update-user-password.dto';

export interface IChangePasswordUseCase extends UseCase<UpdateUserPasswordDto> {}
