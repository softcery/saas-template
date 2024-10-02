import { ClientException } from 'src/core/exceptions/domain/exceptions/client-exception/client.exception';

export class TrialNotAllowedOnPlanException extends ClientException {
  public static readonly CODE = 'TRIAL_NOT_ALLOWED_ON_PLAN';

  constructor(planName: string) {
    super(TrialNotAllowedOnPlanException.CODE, `Trial period is not allowed on plan ${planName}`);
  }
}
