import { IUseCase } from '~shared/application/use-cases/use-case.interface';

import { PaymentCustomerDto } from '../../dto/payment-customer.dto';

export interface IGetPaymentCustomerPayload {
  userId: string;
}

export interface IGetPaymentCustomerUseCase extends IUseCase<IGetPaymentCustomerPayload, PaymentCustomerDto> {}
