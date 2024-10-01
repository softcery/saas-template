export class SubscriptionPlanDto {
  public productId: string;
  public name: string;
  public description: string;
  public features: string[];

  public price: number;
  public currency: string;

  public isTrialAllowed: boolean;
}
