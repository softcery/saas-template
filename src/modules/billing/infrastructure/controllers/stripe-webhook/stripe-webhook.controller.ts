import { Controller, Headers, HttpCode, HttpStatus, Inject, Post, RawBody } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

import { UnexpectedException } from '~core/exceptions/domain/exceptions/unexpected-exception/unexpected.exception';
import { IUpdateCustomerSubscriptionUseCase } from '~modules/billing/application/use-cases/update-payment-customer-subscription/update-payment-customer-subscription-use-case.interface';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { BillingDiToken } from '../../stripe/constants';
import { StripeSubscriptionMapper } from '../../stripe/mappers/stripe-subscription/stripe-subscription.mapper';
import { StripeClientService } from '../../stripe/services/stripe-client-service/stripe-client.service';

@ApiExcludeController()
@Controller('stripe-webhook')
export class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeClientService,
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
    private readonly stripeSubscriptionMapper: StripeSubscriptionMapper,
    @Inject(BillingDiToken.UPDATE_PAYMENT_CUSTOMER_SUBSCRIPTION_USE_CASE)
    private readonly updatePaymentCustomerSubscriptionUseCase: IUpdateCustomerSubscriptionUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  public async handleStripeEvent(@RawBody() body: string, @Headers('stripe-signature') stripeSignature?: string) {
    try {
      const event = await this.stripeService.stripe.webhooks.constructEventAsync(
        body,
        stripeSignature,
        this.appConfig.getOrThrow('DD_STRIPE_WEBHOOK_SIGNING_SECRET'),
      );
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.deleted':
        case 'customer.subscription.updated':
          const subscriptionModel = this.stripeSubscriptionMapper.toDomain(event.data.object);
          await this.updatePaymentCustomerSubscriptionUseCase.execute({
            customerProviderId: event.data.object.customer as string,
            subscription: subscriptionModel,
          });
          break;
      }
      // await this.eventEmitter.emitAsync(event.type, event);
    } catch (error) {
      throw new UnexpectedException(error);
    }
  }
}
