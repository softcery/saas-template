export class Session {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public tokenType: string,
    public expiresIn: number,
    public providerToken: string | null = null,
    public providerRefreshToken: string | null = null,
    public expiresAt?: Date,
  ) {}
}
