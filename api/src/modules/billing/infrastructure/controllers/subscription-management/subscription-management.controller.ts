import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserId } from '~modules/auth/infrastructure/decorators/user-id/user-id.decorator';
import { ArrangeSubscriptionDto } from '~modules/billing/application/dto/arrange-subscription.dto';
import { IArrangeSubscriptionUseCase } from '~modules/billing/application/use-cases/arrange-subscription/arrange-subscription-use-case.interface';
import { ICancelSubscriptionUseCase } from '~modules/billing/application/use-cases/cancel-subscription/cancel-subscription-use-case.interface';
import { IUpgradeSubscriptionUseCase } from '~modules/billing/application/use-cases/upgrade-subscription/upgrade-subscription-use-case.interface';

import { BillingDiToken } from '../../stripe/constants';

@ApiTags('billing')
@Controller('subscription/management')
export class SubscriptionManagementController {
  constructor(
    @Inject(BillingDiToken.ARRANGE_SUBSCRIPTION_USE_CASE)
    private readonly arrangeSubscriptionUseCase: IArrangeSubscriptionUseCase,
    @Inject(BillingDiToken.UPGRADE_SUBSCRIPTION_USE_CASE)
    private readonly upgradeSubscriptionUseCase: IUpgradeSubscriptionUseCase,
    @Inject(BillingDiToken.CANCEL_SUBSCRIPTION_USE_CASE)
    private readonly cancelSubscriptionUseCse: ICancelSubscriptionUseCase,
  ) {}

  @ApiOperation({
    operationId: 'arrangeSubscription',
  })
  @Post('arrange')
  public async arrangeSubscription(@UserId() userId: string, @Body() arrangeSubscriptionDto: ArrangeSubscriptionDto) {
    const result = await this.arrangeSubscriptionUseCase.execute({ userId, arrangeSubscriptionDto });
    return result;
  }

  @ApiOperation({
    operationId: 'upgradeSubscription',
  })
  @Post('upgrade')
  public async upgradeSubscription(@UserId() userId: string) {
    const result = await this.upgradeSubscriptionUseCase.execute({ userId });
    return result;
  }

  @ApiOperation({
    operationId: 'cancelSubscription',
  })
  @Post('cancel')
  public async cancelSubscription(@UserId() userId: string) {
    const result = await this.cancelSubscriptionUseCse.execute({ userId });
    return result;
  }
}
