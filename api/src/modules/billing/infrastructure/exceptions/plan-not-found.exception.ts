import { ClientException } from 'src/core/exceptions/domain/exceptions/client-exception/client.exception';

export class PlanNotFoundException extends ClientException {
  public static readonly CODE = 'PLAN_NOT_FOUND';

  constructor(planId: string) {
    super(PlanNotFoundException.CODE, `Plan with id: ${planId} was not found`);
  }
}
