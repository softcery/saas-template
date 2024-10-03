import { IUseCase } from '~shared/application/use-cases/use-case.interface';

import { SendResetPasswordConfirmationDto } from '../../dto/send-reset-password-confirmation.dto';

export interface ISendResetPasswordConfirmationUseCase extends IUseCase<SendResetPasswordConfirmationDto> {}
