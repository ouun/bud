import {describe, expect, it} from 'vitest'

import Extension from '../src/index.js'

describe(`@roots/bud-eslint`, () => {
  it(`should be constructable`, () => {
    expect(Extension).toBeInstanceOf(Function)
  })
})