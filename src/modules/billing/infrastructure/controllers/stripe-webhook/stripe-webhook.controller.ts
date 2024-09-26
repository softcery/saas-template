// import { Controller, Headers, HttpCode, HttpStatus, Inject, Post, RawBody } from '@nestjs/common';
// import { EventEmitter2 } from '@nestjs/event-emitter';
// import { ApiExcludeController } from '@nestjs/swagger';

// import { PublicRoute } from '~modules/auth/application/decorators/public-route/public-route.decorator';
// import { APP_CONFIG } from '~shared/config/constants';
// import { IAppConfigService } from '~shared/config/services/config-service/app-config-service.interface';
// import { UnexpectedException } from '~shared/core/exceptions/domain/unexpected-exception/unexpected.exception';
// import { STRIPE } from '~shared/stripe/constants';
// import { IStripeService } from '~shared/stripe/domain/services/stripe/stripe-service.interface';

// @ApiExcludeController()
// @PublicRoute()
// @Controller('stripe-webhook')
// export class StripeWebhookController {
//   constructor(
//     @Inject(STRIPE) private readonly stripeService: IStripeService,
//     private readonly eventEmitter: EventEmitter2,
//     @Inject(APP_CONFIG) private readonly appConfig: IAppConfigService,
//   ) {}

//   @Post()
//   @HttpCode(HttpStatus.OK)
//   public async handleStripeEvent(@RawBody() body: string, @Headers('stripe-signature') stripeSignature?: string) {
//     try {
//       const event = await this.stripeService.stripe.webhooks.constructEventAsync(
//         body,
//         stripeSignature,
//         this.appConfig.getOrThrow('DD_STRIPE_WEBHOOK_SIGNING_SECRET'),
//       );
//       await this.eventEmitter.emitAsync(event.type, event);
//     } catch (error) {
//       throw new UnexpectedException(error);
//     }
//   }
// }
