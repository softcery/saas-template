// import { Inject, Injectable } from '@nestjs/common';
// import { OnEvent } from '@nestjs/event-emitter';

// import { PAYMENT_CUSTOMER_SERVICE } from '~modules/billing/constants';
// import { IPaymentCustomerService } from '~modules/billing/infrastructure/services/payment-customer/payment-customer-service.interface';
// import { UserCreatedEvent } from '~modules/users/application/events/user-created.event';
// import { AppEvents } from '~shared/core/types/app-events.enum';

// @Injectable()
// export class UserEventHandler {
//   constructor(@Inject(PAYMENT_CUSTOMER_SERVICE) private readonly paymentCustomerService: IPaymentCustomerService) {}

//   @OnEvent(AppEvents.USER_CREATED)
//   public handleUserCreated(event: UserCreatedEvent) {
//     this.paymentCustomerService.createCustomer({
//       userId: event.user.id,
//       email: event.user.companyEmail,
//       name: event.user.fullName,
//     });
//   }
// }
