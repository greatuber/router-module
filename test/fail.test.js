import { Nuxt, Builder } from 'nuxt'
import consola from 'consola'
import config from './fixture/fail/nuxt.config'

consola.mockTypes(() => jest.fn())

describe('Module', () => {
  let nuxt

  beforeAll(async () => {
    config.dev = false
    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('should warn if not found the router file', () => {
    expect(consola.warn).toHaveBeenNthCalledWith(1, expect.stringMatching(/^No `(.*)` file found in `(.*)`.$/))
  })
})
