import type {Context} from '@roots/bud-framework/config'
import {bind} from 'helpful-decorators'

export default class Extensions {
  public data: Array<string> = [
    `@roots/bud-terser/extension`,
    `@roots/bud/extensions/bud-cdn`,
    `@roots/bud/extensions/bud-esm`,
    `@roots/bud/extensions/clean-webpack-plugin`,
    `@roots/bud/extensions/webpack-provide-plugin`,
    `@roots/bud/extensions/webpack-remove-empty-scripts`,
    `@roots/bud/extensions/webpack-manifest-plugin`,
    `@roots/bud/extensions/webpack-hot-module-replacement-plugin`,
    `@roots/bud/extensions/webpack-define-plugin`,
    `@roots/bud/extensions/mini-css-extract-plugin`,
    `@roots/bud/extensions/copy-webpack-plugin`,
  ]

  public constructor(public manifest: Context['manifest']) {}

  @bind
  public async find() {
    this.filterApplicableExtensions(
      Object.keys({
        ...(this.manifest?.devDependencies ?? {}),
        ...(this.manifest?.dependencies ?? {}),
      }),
    )

    return this
  }

  @bind
  public filterApplicableExtensions(extensions: Array<string>) {
    extensions
      .filter(
        signifier =>
          signifier.startsWith(`@roots/bud-`) ||
          signifier.startsWith(`@roots/sage`) ||
          signifier.startsWith(`bud-`),
      )
      .filter(
        signifier =>
          ![
            `@roots/bud-api`,
            `@roots/bud-build`,
            `@roots/bud-cache`,
            `@roots/bud-client`,
            `@roots/bud-compiler`,
            `@roots/bud-dashboard`,
            `@roots/bud-extensions`,
            `@roots/bud-framework`,
            `@roots/bud-hooks`,
            `@roots/bud-server`,
          ].includes(signifier),
      )
      .filter(
        signifier =>
          !this.manifest.bud?.denylist ||
          !this.manifest.bud.denylist.includes(signifier),
      )
      .filter(
        signifier =>
          !this.manifest.bud?.allowlist ||
          this.manifest.bud.allowlist.includes(signifier),
      )
      .map(signifier => this.data.push(signifier))
  }
}