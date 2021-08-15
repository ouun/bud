import {factory, Framework} from '@roots/bud'
import {Components} from '@roots/bud-dashboard'
import {React} from '@roots/bud-support'

import * as Ink from '../../util/ink'

jest.setTimeout(20000)

process.env.BUD_KEEP_ALIVE = 'true'

describe('@roots/bud-dashboard', function () {
  let bud: Framework

  let dashboard: any

  beforeAll(() => {
    bud = factory()
    bud.compiler.compile().run(bud.compiler.callback)
    dashboard = Ink.render(<Components.Dashboard bud={bud} />)
  })

  afterAll(() => {
    dashboard.cleanup()
  })

  it('exists', () => {
    expect(bud.dashboard).toBeDefined()
  })

  it('has a service name of `dashboard`', () => {
    expect(bud.dashboard.name).toBe('dashboard')
  })

  it('has a run method', () => {
    expect(bud.dashboard.run).toBeInstanceOf(Function)
  })

  it('displays an error', done => {
    setTimeout(() => {
      expect(
        dashboard
          .lastFrame()
          .includes(
            "Module not found: Error: Can't resolve './src'",
          ),
      ).toBe(true)

      done()
    }, 1000)
  })
})