// TODO: change it after discussion with the team
interface Context {
  body: {
    error: ResponseError
  }
}
export interface ResponseError {
  message: string
  status?: number
}

export const modifyError = (context: unknown): ResponseError => {
  if (hasBodyError(context)) {
    const { message, status } = context.body.error

    if (message) {
      return { message: message, status }
    }

    return new Error(`${status}: Unknown error`)
  }

  return new Error(`${context}: Unknown error`)
}

// eslint-disable-next-line
const hasBodyError = (context: any): context is Context =>
  Boolean(context && typeof context === 'object' && context?.body.error)
