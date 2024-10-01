export class PassportOauth2Error extends Error {
  private static readonly codeStatusRecord: Record<string, number> = {
    access_denied: 403,
    server_error: 500,
    temporarily_unavailable: 503,
  };

  constructor(
    message: string,
    public code: string,
    public uri: string,
    private _status?: number,
  ) {
    super(message);
  }

  get status() {
    return this._status ?? PassportOauth2Error.codeStatusRecord[this.code];
  }
}
