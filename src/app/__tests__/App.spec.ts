import { mount } from '@vue/test-utils'
import App from '../App.vue'

test('mounts app', () => {
  const wrapper = mount(App)

  const app = wrapper.get('[data-test="app"]')

  expect(app.text()).toBe('Learn Vue.js 3')
})
