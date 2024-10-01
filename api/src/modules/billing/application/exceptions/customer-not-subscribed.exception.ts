import { ClientException } from 'src/core/exceptions/domain/exceptions/client-exception/client.exception';

export class CustomerNotSubscribedException extends ClientException {
  public static readonly CODE = 'CUSTOMER_NOT_SUBSCRIBED';

  constructor() {
    super(CustomerNotSubscribedException.CODE, 'Customer does not have any active subscriptions');
  }
}
