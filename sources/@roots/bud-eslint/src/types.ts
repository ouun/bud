/// <reference types="@roots/bud" />

import type BudEslint from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    eslint: BudEslint
  }

  interface Modules {
    '@roots/bud-eslint': BudEslint
  }
}
