import { Builder } from 'builder-pattern';

import { PlanQuota } from '~modules/billing/domain/value-objects/plan-quota.value';

export class SubscriptionProduct {
  public providerId: string;
  public name: string;
  public quota: PlanQuota;
  public features: string[] = [];
  public description: string | null;
  public isTrialAllowed: boolean = false;

  public static builder(id: string, name: string, quota: PlanQuota) {
    return Builder(SubscriptionProduct, { providerId: id, name, quota });
  }
}
