import { User as DomainUser } from './domain/entities/user.entity';
import { Session } from './domain/value-objects/session.value';

declare global {
  declare namespace Express {
    export interface Request {
      session?: Session | null;
      accessToken?: string;
    }

    export interface User extends DomainUser {}
  }
}
