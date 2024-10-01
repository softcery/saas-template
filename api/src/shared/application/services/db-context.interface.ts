import { IUserRepository } from '~modules/auth/application/repositories/user-repository.interface';
import { IPaymentCustomerRepository } from '~modules/billing/application/repositories/payment-customer-repository.interface';

export interface IDbRepositories {
  userRepository: IUserRepository;
  paymentCustomerRepository: IPaymentCustomerRepository;
}

export interface IDbContext extends IDbRepositories {
  startTransaction(): Promise<void>;

  commitTransaction(): Promise<void>;

  rollbackTransaction(): Promise<void>;
}
