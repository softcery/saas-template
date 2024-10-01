interface HashSessionParams {
  access_token: string
  refresh_token: string
  token_type: string | 'bearer'
}

export const isValidSessionParams = (
  // eslint-disable-next-line
  hashParams: Record<string, any>,
): hashParams is HashSessionParams => {
  return Boolean(
    hashParams &&
      hashParams?.access_token &&
      hashParams?.refresh_token &&
      hashParams?.token_type,
  )
}
