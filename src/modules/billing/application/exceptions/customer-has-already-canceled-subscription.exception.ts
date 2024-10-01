import { ClientException } from 'src/core/exceptions/domain/exceptions/client-exception/client.exception';

export class CustomerHasAlreadyCanceledSubscriptionException extends ClientException {
  public static readonly CODE = 'CUSTOMER_HAS_ALREADY_CANCELED_SUBSCRIPTION';

  constructor() {
    super(CustomerHasAlreadyCanceledSubscriptionException.CODE, 'Customer has already canceled subscription plan');
  }
}
