/// <reference types="vite/client" />

declare module '*.svg' {
  const content: any
  export default content
}

declare global {
  /**
   * ⚠️ FSD
   *
   * Its hack way to export redux infering types from @/app
   * and use it in @/shared/model/hooks.ts
   */

  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  type RootState = import('./app/providers/with-redux').RootState
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  type AppDispatch = import('./app/providers/with-redux').AppDispatch
}

export {}
