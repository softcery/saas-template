// import { Body, Controller, Post } from '@nestjs/common';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';

// import { UserId } from '~modules/auth/application/decorators/user-id/user-id.decorator';
// import { ArrangeSubscriptionDto } from '~modules/billing/application/dto/arrange-subscription.dto';
// import { ArrangeSubscriptionUseCase } from '~modules/billing/application/use-cases/arrange-subscription/arrange-subscription.use-case';
// import { CancelSubscriptionUseCase } from '~modules/billing/application/use-cases/cancel-subscription/cancel-subscription.use-case';
// import { UpgradeSubscriptionUseCase } from '~modules/billing/application/use-cases/upgrade-subscription/upgrade-subscription.use-case';

// @ApiTags('Subscription plans')
// @Controller('subscription/management')
// export class SubscriptionManagementController {
//   constructor(
//     private readonly arrangeSubscriptionUseCase: ArrangeSubscriptionUseCase,
//     private readonly upgradeSubscriptionUseCase: UpgradeSubscriptionUseCase,
//     private readonly cancelSubscriptionUseCse: CancelSubscriptionUseCase,
//   ) {}

//   @ApiOperation({
//     operationId: 'arrangeSubscription',
//   })
//   @Post('arrange')
//   public async arrangeSubscription(@UserId() userId: string, @Body() arrangeSubscriptionDto: ArrangeSubscriptionDto) {
//     const result = await this.arrangeSubscriptionUseCase.execute(userId, arrangeSubscriptionDto);
//     return result;
//   }

//   @ApiOperation({
//     operationId: 'upgradeSubscription',
//   })
//   @Post('upgrade')
//   public async upgradeSubscription(@UserId() userId: string) {
//     const result = await this.upgradeSubscriptionUseCase.execute(userId);
//     return result;
//   }

//   @ApiOperation({
//     operationId: 'cancelSubscription',
//   })
//   @Post('cancel')
//   public async cancelSubscription(@UserId() userId: string) {
//     const result = await this.cancelSubscriptionUseCse.execute(userId);
//     return result;
//   }
// }
