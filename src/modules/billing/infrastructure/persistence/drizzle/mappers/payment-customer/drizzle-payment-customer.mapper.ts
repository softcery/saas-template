import { Injectable } from '@nestjs/common';

import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';

@Injectable()
export class DrizzlePaymentCustomerMapper {
  toPersistence(entity: PaymentCustomer): any {
    // TODO - add persistence type
  }
}
