import type { TokensResultDto } from '@softcery/sass-template-apiclient'

import { Api, ApiManager } from './api-manager'
import { UNAUTHORIZED_ERROR } from '../config'
import { ApiError, AuthenticationErrorCallback, TokenRefreshedCallback } from './types'

class ApiWithRefreshManager implements Api {
  private apiManager = new ApiManager()
  private refreshingToken: Promise<TokensResultDto | undefined> | null = null
  private refreshToken?: string
  private authenticationErrorCallback?: AuthenticationErrorCallback
  private tokenRefreshedCallback?: TokenRefreshedCallback

  public generateConfiguration = () => {
    return this.apiManager.generateConfiguration()
  }

  public generateConfigurationWithHandleExpiredTokenRetry = () => {
    return this.apiManager.generateConfigurationWithProxyHandler({
      handleErrorResponse: this.handleExpiredTokenRetry,
    })
  }

  private handleExpiredTokenRetry = async (
    response: ApiError,
  ): Promise<ApiError | Response> => {
    if (response.status === UNAUTHORIZED_ERROR) {
      return this.handleExpiredToken(response)
    }

    return this.createErrorResponsePromise(response)
  }

  private handleExpiredToken = async (response: ApiError): Promise<Response> => {
    try {
      const session = await this.getDebouncedRefreshedSession()

      if (!session?.accessToken) return await this.createErrorResponsePromise(response)
      this.tokenRefreshedCallback?.(session)
      this.updateAccessToken(session.accessToken)
      this.updateRefreshToken(session.refreshToken)

      const repeatedRequestResponse = await this.repeatRequestWithUpdatedToken(
        response,
        session.accessToken,
      )

      if (!repeatedRequestResponse.ok) {
        throw new Error('Request failed')
      }

      return await repeatedRequestResponse.json()
    } catch (e) {
      this.authenticationErrorCallback?.()
      return this.createErrorResponsePromise(response)
    }
  }

  private getDebouncedRefreshedSession = async (): Promise<
    TokensResultDto | undefined
  > => {
    if (this.refreshingToken) return this.refreshingToken

    this.refreshingToken = (async () => {
      try {
        const refreshToken = this.getRefreshToken()

        if (!refreshToken) throw new Error('No refresh token')

        return await this.refreshSession(refreshToken)
      } catch (error) {
        console.error('Token refresh failed:', error)

        return undefined
      } finally {
        this.refreshingToken = null
      }
    })()

    return this.refreshingToken
  }

  private refreshSession = async (
    refreshToken: string,
  ): Promise<TokensResultDto | undefined> => {
    try {
      return await this.generateConfiguration().auth.refresh({
        requestBody: { refreshToken },
      })
    } catch (error) {
      console.error('Refresh token request failed:', error)
      throw error
    }
  }

  private createErrorResponsePromise = (response: ApiError) =>
    new Promise<Response>((_, reject) => reject(response))

  private repeatRequestWithUpdatedToken = (response: ApiError, accessToken: string) => {
    // TODO: modify when request with payload will be ready
    return fetch(response.url, {
      method: response.request.method,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
  }

  public updateAccessToken = (newToken: string) => {
    this.apiManager.updateAccessToken(newToken)
  }

  public updateRefreshToken = (refreshToken: string) => {
    this.refreshToken = refreshToken
  }

  public updateAuthenticationErrorCallback = (
    authenticationErrorCallback: AuthenticationErrorCallback,
  ) => {
    this.authenticationErrorCallback = authenticationErrorCallback
  }
  public updateTokenRefreshedCallback = (
    tokenRefreshedCallback: TokenRefreshedCallback,
  ) => {
    this.tokenRefreshedCallback = tokenRefreshedCallback
  }
  public getRefreshToken = () => {
    return this.refreshToken
  }
  public resetRefreshToken = () => {
    this.refreshToken = undefined
  }
  public resetAccessToken = () => {
    this.apiManager.resetAccessToken()
  }
}

export const {
  updateAccessToken,
  updateRefreshToken,
  updateAuthenticationErrorCallback,
  resetAccessToken,
  resetRefreshToken,
  updateTokenRefreshedCallback,
  generateConfigurationWithHandleExpiredTokenRetry: apiService,
} = new ApiWithRefreshManager()
