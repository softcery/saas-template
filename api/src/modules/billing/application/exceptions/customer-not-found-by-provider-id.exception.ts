import { ClientException } from '~core/exceptions/domain/exceptions/client-exception/client.exception';

export class CustomerNotFoundByProviderIdException extends ClientException {
  public static readonly CODE = 'CUSTOMER_NOT_FOUND_BY_PROVIDER_ID';

  constructor(id: string) {
    super(CustomerNotFoundByProviderIdException.CODE, `Payment customer with provider id: ${id} was not found`);
  }
}
