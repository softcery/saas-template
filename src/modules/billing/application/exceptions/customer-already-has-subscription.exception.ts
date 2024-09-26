import { ClientException } from 'src/core/exceptions/domain/exceptions/client-exception/client.exception';

export class CustomerAlreadyHasSubscriptionException extends ClientException {
  public static readonly CODE = 'CUSTOMER_ALREADY_HAS_SUBSCRIPTION';
  constructor() {
    super(CustomerAlreadyHasSubscriptionException.CODE, 'Customer already has active subscription');
  }
}
