import { UseCase } from '~shared/application/use-case/use-case.interface';

import { SendResetPasswordConfirmationDto } from '../../dto/send-reset-password-confirmation.dto';

export interface ISendResetPasswordConfirmationUseCase extends UseCase<SendResetPasswordConfirmationDto> {}
