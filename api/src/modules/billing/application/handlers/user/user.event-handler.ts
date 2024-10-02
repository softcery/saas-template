import { Inject, Scope } from '@nestjs/common';

import { UserCreatedEvent } from '~modules/auth/domain/events/user-created.event';
import { PaymentCustomer } from '~modules/billing/domain/entities/payment-customer.entity';
import { BillingDiToken } from '~modules/billing/infrastructure/stripe/constants';
import { IDbContext } from '~shared/application/services/db-context.interface';
import { BaseToken } from '~shared/constants';

import { EventsHandler, IEventHandler } from 'src/lib/nest-event-driven';

import { IPaymentCustomerService } from '../../services/payment-customer-service.interface';

@EventsHandler({ events: [UserCreatedEvent], scope: Scope.REQUEST })
export class UserEventHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    @Inject(BillingDiToken.CUSTOMER_PROVIDER_SERVICE) private readonly paymentCustomerService: IPaymentCustomerService,
    @Inject(BaseToken.DB_CONTEXT) private readonly dbContext: IDbContext,
  ) {}

  public async handle(event: UserCreatedEvent) {
    const providerCustomer = await this.paymentCustomerService.createCustomer({
      email: event.payload.user.email,
    });

    const domainCustomer = PaymentCustomer.fromOptions({
      userId: event.payload.user.id,
      email: event.payload.user.email,
      name: providerCustomer.name,
      providerCustomerId: providerCustomer.providerId,
      trialCanceledAt: providerCustomer.trialCanceledAt,
      subscriptionProviderId: providerCustomer.subscription?.providerId,
    });

    await this.dbContext.paymentCustomerRepository.create(domainCustomer);
  }
}
