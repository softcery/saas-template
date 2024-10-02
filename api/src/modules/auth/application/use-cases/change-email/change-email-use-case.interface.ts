import { UseCase } from '~shared/application/use-cases/use-case.interface';

import { UpdateUserEmailDto } from '../../dto/update-user-email.dto';

export interface IChangeEmailUseCase extends UseCase<UpdateUserEmailDto> {}
