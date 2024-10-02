import { ClientException } from 'src/core/exceptions/domain/exceptions/client-exception/client.exception';

export class CustomerHasAlreadyUsedHisTrialException extends ClientException {
  public static readonly CODE = 'CUSTOMER_HAS_ALREADY_USED_HIS_TRIAL';

  constructor() {
    super(CustomerHasAlreadyUsedHisTrialException.CODE, 'Customer has already used his trial period');
  }
}
