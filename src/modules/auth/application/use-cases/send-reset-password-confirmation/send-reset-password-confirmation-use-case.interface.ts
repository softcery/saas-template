import { UseCase } from '~shared/application/use-case/use-case.interface';

import { ResetPasswordDto } from '../../dto/reset-password.dto';

export interface ISendResetPasswordConfirmationUseCase extends UseCase<ResetPasswordDto> {}
