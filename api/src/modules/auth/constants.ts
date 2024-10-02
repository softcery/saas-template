export enum AuthGuardToken {
  EMAIL_PASSWORD = 'email-password',
  JWT_ACCESS = 'jwt-access',
  JWT_REFRESH = 'jwt-refresh',
  GOOGLE_OAUTH2 = 'google-oauth2',
}

export enum AuthDiToken {
  AUTH_SERVICE = 'AUTH_SERVICE',
  CHANGE_EMAIL_USE_CASE = 'CHANGE_EMAIL_USE_CASE',
  CHANGE_PASSWORD_USE_CASE = 'CHANGE_PASSWORD_USE_CASE',
  SEND_RESET_PASSWORD_CONFIRMATION_USE_CASE = 'SEND_RESET_PASSWORD_CONFIRMATION_USE_CASE',
  RESET_PASSWORD_USE_CASE = 'RESET_PASSWORD_USE_CASE',
  PASSWORD_SERVICE = 'PASSWORD_SERVICE',
  SIGN_UP_BY_EMAIL_PASSWORD = 'SIGN_UP_BY_EMAIL_PASSWORD',
  PERFORM_POST_OAUTH_USE_CASE = 'PERFORM_POST_OAUTH_USE_CASE',
}
