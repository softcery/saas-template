import { UseCase } from '~shared/application/use-cases/use-case.abstract';

import { SendResetPasswordConfirmationDto } from '../../dto/send-reset-password-confirmation.dto';

export interface ISendResetPasswordConfirmationUseCase extends UseCase<SendResetPasswordConfirmationDto> {}
