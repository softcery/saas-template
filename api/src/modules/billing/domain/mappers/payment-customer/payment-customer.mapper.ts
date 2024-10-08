import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PaymentCustomerDto } from '~modules/billing/application/dto/payment-customer.dto';

import { PaymentCustomer } from '../../entities/payment-customer.entity';

@Injectable()
export class PaymentCustomerMapper {
  toDto(domain: PaymentCustomer): PaymentCustomerDto {
    return plainToInstance(PaymentCustomerDto, {
      email: domain.email,
      name: domain.name,
      planEndsAt: domain.paymentPlan?.planEndsAt?.getTime(),
      planStartedAt: domain.paymentPlan?.planStartedAt?.getTime(),
      subscriptionCanceledAt: domain.subscriptionCanceledAt?.getTime(),
      subscriptionProductId: domain.paymentPlan?.productProviderId,
      subscriptionStatus: domain.paymentPlan?.subscriptionStatus,
      trialCanceledAt: domain.trialCanceledAt?.getTime(),
      trialEndsAt: domain.paymentPlan?.trialEndsAt?.getTime(),
      trialStartedAt: domain.trialStartedAt?.getTime(),
    } satisfies PaymentCustomerDto);
  }
}
