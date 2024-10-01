import { ClientException } from 'src/core/exceptions/domain/exceptions/client-exception/client.exception';

export class CustomerForUserDoesNotExistException extends ClientException {
  public static readonly CODE = 'CUSTOMER_FOR_USER_DOES_NOT_EXIST';

  constructor(id: string) {
    super(CustomerForUserDoesNotExistException.CODE, `Customer related to user with id: ${id} does not exist`);
  }
}
