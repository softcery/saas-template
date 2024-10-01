import { IUserRepository } from '~modules/auth/application/repositories/user-repository.interface';

export interface IDbRepositories {
  userRepository: IUserRepository;
}

export interface IDbContext extends IDbRepositories {
  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;
}
