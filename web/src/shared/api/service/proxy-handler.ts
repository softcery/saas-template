import { ApiClient } from '@softcery/sass-template-apiclient'

import { ApiError, HandleErrorResponse, ProxyOptions } from './types'

export class ProxyHandler {
  private apiClient: ApiClient
  private handleErrorResponse: HandleErrorResponse

  constructor(apiClient: ApiClient, { handleErrorResponse }: ProxyOptions) {
    this.apiClient = apiClient
    this.handleErrorResponse = handleErrorResponse
  }
  public createProxy(target: unknown): ApiClient {
    return new Proxy(target as ApiClient, {
      get: (target: ApiClient, prop: keyof ApiClient) => {
        if ('prop' in target && typeof target[prop] !== 'undefined') {
          return target[prop]
        }

        if (typeof this.apiClient[prop] === 'object') {
          return this.createObjectProxy(prop)
        }

        return this.apiClient[prop]
      },
    })
  }

  private async handleAsyncCall(
    fn: (...args: unknown[]) => Promise<ApiError>,
    ...args: unknown[]
  ): Promise<Response | ApiError> {
    try {
      return await fn(...args)
    } catch (e) {
      return await this.handleErrorResponse(e as ApiError)
    }
  }

  private createObjectProxy<T extends keyof ApiClient, S extends keyof ApiClient[T]>(
    prop: T,
  ) {
    return new Proxy(this.apiClient[prop], {
      get: (_, subProp: PropertyKey) => {
        const selectedPropertyValue = this.apiClient[prop][subProp as S]
        if (typeof selectedPropertyValue === 'function') {
          return (...args: unknown[]) => {
            return this.handleAsyncCall(
              selectedPropertyValue.bind(this.apiClient[prop]),
              ...args,
            )
          }
        }
        return selectedPropertyValue
      },
    })
  }
}
