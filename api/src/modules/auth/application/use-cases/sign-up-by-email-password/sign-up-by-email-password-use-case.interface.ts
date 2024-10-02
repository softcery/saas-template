import { UseCase } from '~shared/application/use-cases/use-case.abstract';

import { EmailPasswordCredentialsDto } from '../../dto/email-password-credentials.dto';

export interface ISignUpByEmailPasswordUseCase extends UseCase<EmailPasswordCredentialsDto, void> {}
