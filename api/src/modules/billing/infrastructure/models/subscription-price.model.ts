export class SubscriptionPrice {
  constructor(
    public providerId: string,
    public centsPrice: number,
    public currency: string,
  ) {}

  get decimalPrice() {
    return this.centsPrice / 100;
  }
}
