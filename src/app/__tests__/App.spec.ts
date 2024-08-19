import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import App from '../App.vue'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { Cookies, Dark } from 'quasar'

installQuasarPlugin({ plugins: { Cookies, Dark } })

describe('App', () => {
  it('mounts', () => {
    const wrapper = mount(App)
    const app = wrapper.get('[data-test="app"]')
    expect(!!app).toBe(true)
  })
})
