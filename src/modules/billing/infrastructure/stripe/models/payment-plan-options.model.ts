import { Builder } from 'builder-pattern';

export class TrialOptions {
  constructor(public daysDuration: number) {}
}
export class PaymentPlanOptions {
  public trialOptions?: TrialOptions = null;

  public static builder() {
    return Builder(PaymentPlanOptions);
  }
}
