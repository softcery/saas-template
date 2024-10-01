import { Request } from 'express';
import { OAuth2 } from 'oauth';
import { Strategy } from 'passport-strategy';
import { URL } from 'url';

import { PassportOauth2Error } from '../../errors/passport-oauth2.error';

export interface IOAuth2StrategyOptions {
  authorizationURL: string;
  tokenURL: string;
  clientID: string;
  clientSecret?: string;
  callbackURL?: string;
  scopeSeparator?: string;
  customHeaders?: Record<string, string>;
  scope?: string[];
}

export abstract class OAuth2Strategy<Params extends object, Profile extends object> extends Strategy {
  protected _oauth2: OAuth2;

  constructor(private readonly _options: IOAuth2StrategyOptions) {
    super();

    this._oauth2 = new OAuth2(
      _options.clientID,
      _options.clientSecret,
      '',
      _options.authorizationURL,
      _options.tokenURL,
      _options.customHeaders,
    );
  }

  protected abstract verify(params: Params, profile: Profile): Promise<void>;

  public async authenticate(req: Request): Promise<void> {
    if (req.query?.error) {
      const error = new PassportOauth2Error(
        req.query.error_description as string,
        req.query.error as string,
        req.query.error_uri as string,
      );
      if (error.code === 'access_denied') {
        return this.fail(error, error.status);
      } else {
        return this.error(error);
      }
    }

    let callbackURL = this._options.callbackURL;

    if (req.query?.code || req.body?.code) {
      try {
        const code = req.query?.code || req.body?.code;
        const params = this.tokenParams(this._options);
        params.grant_type = 'authorization_code';
        if (callbackURL) params.redirect_uri = callbackURL;

        const { accessToken, refreshToken, params: tokenParams } = await this.getOAuthAccessToken(code, params);
        const profile = await this.loadUserProfile(accessToken);

        await this.verify(tokenParams, profile);
      } catch (err) {
        return this.error(err);
      }
    } else {
      const params = this.authorizationParams(this._options);
      params.response_type = 'code';
      if (callbackURL) params.redirect_uri = callbackURL;

      if (this._options.scope) {
        params.scope = this._options.scope.join(this._options.scopeSeparator ?? ' ');
      }

      const location = new URL(this._options.authorizationURL);
      location.searchParams.append('client_id', this._options.clientID);
      Object.entries(params).forEach(([key, value]) => location.searchParams.append(key, value as string));

      this.redirect(location.toString());
    }
  }

  // Retrieve user profile from the service provider
  public async userProfile(accessToken: string): Promise<Profile | null> {
    return null;
  }

  // Return extra parameters to be included in the authorization request
  protected authorizationParams(options: Record<string, any> = {}): Record<string, any> {
    return {};
  }

  // Return extra parameters to be included in the token request
  protected tokenParams(options: Record<string, any> = {}): Record<string, any> {
    return {};
  }

  // Load user profile, contingent upon options
  private async loadUserProfile(accessToken: string): Promise<Profile | null> {
    return this.userProfile(accessToken);
  }

  // Simulating the getOAuthAccessToken function (should be implemented based on the OAuth library you use)
  private async getOAuthAccessToken(
    code: string,
    params: Record<string, unknown>,
  ): Promise<{ accessToken: string; refreshToken: string; params: Params }> {
    return new Promise((resolve, reject) => {
      this._oauth2.getOAuthAccessToken(code, params, (err, accessToken, refreshToken, params) => {
        if (err) reject(err);
        else resolve({ accessToken, refreshToken, params });
      });
    });
  }
}
