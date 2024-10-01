import { ApiClient } from '@softcery/detectdata-apiclient'

import { ApiError, HandleErrorResponse, ProxyOptions } from './types'

export class ProxyHandler {
  private apiClient: ApiClient
  private handleErrorResponse: HandleErrorResponse

  constructor(apiClient: ApiClient, { handleErrorResponse }: ProxyOptions) {
    this.apiClient = apiClient
    this.handleErrorResponse = handleErrorResponse
  }
  public createProxy(target: unknown): ApiClient {
    return new Proxy(target, {
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

  private createObjectProxy(prop: keyof ApiClient) {
    return new Proxy(this.apiClient[prop], {
      get: (_, subProp: string | symbol) => {
        if (typeof this.apiClient[prop][subProp] === 'function') {
          return (...args: unknown[]) => {
            return this.handleAsyncCall(
              this.apiClient[prop][subProp].bind(this.apiClient[prop]),
              ...args,
            )
          }
        }
        return this.apiClient[prop][subProp]
      },
    })
  }
}
