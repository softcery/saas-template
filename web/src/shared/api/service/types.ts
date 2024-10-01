import { AccessWithRefreshTokenResponseDto as Session } from '@softcery/detectdata-apiclient'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

interface ApiErrorDetails {
  message: string
  status: number
}

interface ApiErrorRequest {
  method: HttpMethod
  url: string
}

export interface ApiError {
  url: string
  status: number
  statusText: string | null
  body: {
    message: string
    error: ApiErrorDetails
  }
  request: ApiErrorRequest
  name: string
}

export type AuthenticationErrorCallback = () => void
export type TokenRefreshedCallback = (session: Session) => void

export type HandleErrorResponse = (response: ApiError) => Promise<ApiError | Response>

export interface ProxyOptions {
  handleErrorResponse: HandleErrorResponse
}
