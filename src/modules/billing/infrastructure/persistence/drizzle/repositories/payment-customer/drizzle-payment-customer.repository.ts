import { Injectable } from '@nestjs/common';

import { IPaymentCustomerRepository } from '~modules/billing/application/repositories/payment-customer-repository.interface';
import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';

@Injectable()
export class DrizzlePaymentCustomerRepository implements IPaymentCustomerRepository {
  public async findByUserId(id: string): Promise<PaymentCustomer> {
    throw Error('Unimplemented');
  }
}
