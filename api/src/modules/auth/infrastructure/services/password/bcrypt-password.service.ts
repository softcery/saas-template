import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { IPasswordService } from '~modules/auth/application/repositories/password-service.interface';

@Injectable()
export class BcryptPasswordService implements IPasswordService {
  public confirm(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return compare(candidatePassword, hashedPassword);
  }
}
