import { Injectable } from '@nestjs/common';

import { PaymentCustomerMapper } from '~modules/billing/domain/mappers/payment-customer/payment-customer.mapper';
import { Query } from '~shared/application/CQS/query.abstract';

import { PaymentCustomerDto } from '../../dto/payment-customer.dto';
import { CustomerForUserDoesNotExistException } from '../../exceptions/customer-for-user-does-not-exist.exception';
import { IGetPaymentCustomerPayload, IGetPaymentCustomerUseCase } from './get-payment-customer-use-case.interface';

@Injectable()
export class GetPaymentCustomerUseCase
  extends Query<IGetPaymentCustomerPayload, PaymentCustomerDto>
  implements IGetPaymentCustomerUseCase
{
  constructor(private readonly paymentCustomerMapper: PaymentCustomerMapper) {
    super();
  }

  protected async implementation(): Promise<PaymentCustomerDto> {
    const paymentCustomer = await this._dbContext.paymentCustomerRepository.findByUserId(this._input.userId);
    if (!paymentCustomer) throw new CustomerForUserDoesNotExistException(this._input.userId);
    return this.paymentCustomerMapper.toDto(paymentCustomer);
  }
}
