import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

@Injectable()
export class StripeClientService {
  public readonly _stripe: Stripe;
  constructor(@Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService) {
    this._stripe = new Stripe(this.appConfig.get('STRIPE_API_KEY'));
  }

  get stripe() {
    return this._stripe;
  }
}
