import { UseCase } from '~shared/application/use-case/use-case.interface';

import { UpdateUserEmailDto } from '../../dto/update-user-email.dto';

export interface IChangeEmailUseCase extends UseCase<UpdateUserEmailDto> {}
