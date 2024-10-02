import { User } from '~modules/auth/domain/entities/user.entity';
import { Session } from '~modules/auth/domain/value-objects/session.value';

export interface IAuthService {
  signUpByEmailPassword(email: string, password: string): Promise<Session>;
  refreshSession(refreshToken: string): Promise<Session>;
  updateEmail(email: string): Promise<User>;
  updatePassword(password: string): Promise<void>;
  sendResetPasswordEmail(email: string, redirectUrl: string): Promise<void>;
}
