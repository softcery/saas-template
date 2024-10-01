interface HashSessionParams {
  access_token: string
  refresh_token: string
  token_type: string | 'bearer'
}

// eslint-disable-next-line
export const isValidSessionParams = (
  hashParams: any,
): hashParams is HashSessionParams => {
  return Boolean(
    hashParams &&
      hashParams?.access_token &&
      hashParams?.refresh_token &&
      hashParams?.token_type,
  )
}
