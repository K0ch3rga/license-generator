import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { Header } from '..'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { Cookies, Dark } from 'quasar'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/entities/user'
import { AccessType } from '@/entities/accsses/Access'

installQuasarPlugin({ plugins: { Cookies, Dark } })

describe('Header without login', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('exists', () => {
    const wrapper = mount(Header)
    const header = wrapper.find('[data-test="header"]').exists()
    expect(header).toBe(true)
  })

  it('has Title', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="title"]').exists()
    expect(component).toBe(true)
  })

  it('has no Generate button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="generate"]').exists()
    expect(component).toBe(false)
  })

  it('has no Name', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="name"]').exists()
    expect(component).toBe(false)
  })

  it('has no Admin button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="admin"]').exists()
    expect(component).toBe(false)
  })

  it('has no Logout button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="logout"]').exists()
    expect(component).toBe(false)
  })
})

describe('Header with generate rights', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useUserStore().setUserFromJWT({
      sub: 'test',
      exp: Number.MAX_SAFE_INTEGER,
      claims: [AccessType.CREATE_LICENSE],
    })
  })

  it('exists', () => {
    const wrapper = mount(Header)
    const header = wrapper.find('[data-test="header"]').exists()
    expect(header).toBe(true)
  })

  it('has Title', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="title"]').exists()
    expect(component).toBe(true)
  })

  it('has Generate button', () => {
    const wrapper = mount(Header)
    console.log(wrapper)
    const component = wrapper.find('[data-test="generate"]').exists()
    expect(component).toBe(true)
  })

  it('has Name', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="name"]').text()
    expect(component).contain('test')
  })

  it('has no Admin button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="admin"]').exists()
    expect(component).toBe(false)
  })

  it('has no Logout button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="logout"]').exists()
    expect(component).toBe(true)
  })
})

describe('Header with Read license rights', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useUserStore().setUserFromJWT({
      sub: 'test',
      exp: Number.MAX_SAFE_INTEGER,
      claims: [AccessType.READ_LICENSE, AccessType.RETRIEVE_FILE],
    })
  })

  it('exists', () => {
    const wrapper = mount(Header)
    const header = wrapper.find('[data-test="header"]').exists()
    expect(header).toBe(true)
  })

  it('has Title', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="title"]').exists()
    expect(component).toBe(true)
  })

  it('has no Generate button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="generate"]').exists()
    expect(component).toBe(false)
  })

  it('has Name', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="name"]').text()
    expect(component).contain('test')
  })

  it('has no Admin button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="admin"]').exists()
    expect(component).toBe(false)
  })

  it('has Logout button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="logout"]').exists()
    expect(component).toBe(true)
  })
})

describe('Header with login', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useUserStore().setUserFromJWT({
      sub: 'admin',
      exp: Number.MAX_SAFE_INTEGER,
      claims: [AccessType.USER_ROLE_MANAGEMENT],
    })
  })

  it('exists', () => {
    const wrapper = mount(Header)
    const header = wrapper.find('[data-test="header"]').exists()
    expect(header).toBe(true)
  })

  it('has Title', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="title"]').exists()
    expect(component).toBe(true)
  })

  it('has no Generate button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="generate"]').exists()
    expect(component).toBe(false)
  })

  it('has Name', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="name"]').text()
    expect(component).contain('admin')
  })

  it('has Admin button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="admin"]').exists()
    expect(component).toBe(true)
  })

  it('has Logout button', () => {
    const wrapper = mount(Header)
    const component = wrapper.find('[data-test="logout"]').exists()
    expect(component).toBe(true)
  })
})
