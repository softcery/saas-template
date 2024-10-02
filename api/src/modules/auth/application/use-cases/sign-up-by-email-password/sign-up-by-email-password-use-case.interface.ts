import { IUseCase } from '~shared/application/use-cases/use-case.interface';

import { EmailPasswordCredentialsDto } from '../../dto/email-password-credentials.dto';

export interface ISignUpByEmailPasswordUseCase extends IUseCase<EmailPasswordCredentialsDto, void> {}
