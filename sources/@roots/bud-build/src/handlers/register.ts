import type {Bud} from '@roots/bud-framework'

import type {Factory} from './index.js'
import * as items from './items/items.js'
import * as loaders from './loaders/loaders.js'
import * as rules from './rules/rules.js'

/**
 * Registry factory curry function
 *
 * @public
 */
export interface makeRegister {
  <T, F extends CallableFunction>(props: Partial<Bud>, setRule: F): <
    K extends keyof T & string,
  >([key, factory]: [K, Factory<T[K]>]) => void
}

/**
 * Register built-in {@link loaders}, {@link items} and {@link rules}
 *
 * @public
 */
export async function register(bud: Bud) {
  Object.entries(loaders).map(makeRegister(bud, bud.build.setLoader))
  Object.entries(items).map(makeRegister(bud, bud.build.setItem))

  // this is a bit of a hack
  // that sets the base stylesheet loader
  // to minicss in production and style-loader in development
  bud.build.items.precss = bud.isProduction
    ? bud.build.items.minicss
    : bud.build.items.style

  // reverse order so the most likely/important rules are processed first
  // by webpack but are are located at the top of the source code
  // in the rules/rules.ts file
  Object.entries(rules).reverse().map(makeRegister(bud, bud.build.setRule))
}

export const makeRegister: makeRegister =
  ({build, hooks, isProduction, path}, setRule) =>
  ([key, factory]) =>
    setRule(
      key,
      factory({
        filter: hooks.filter,
        makeItem: build.makeItem,
        makeLoader: build.makeLoader,
        makeRule: build.makeRule,
        isProduction,
        path,
      }),
    )