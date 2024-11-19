import { BACKEND_CONNECTION } from '@/shared/config'
import type { User } from '../model/User'
import { Cookies } from 'quasar'
import { type NewUserDto } from '../model'

export const createUser = async (user: NewUserDto): Promise<User> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'users', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('session'),
        'Content-Type': ' application/json',
      },
      body: JSON.stringify(user),
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((r) => r as User)
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}

export const deleteUser = async (user: User): Promise<User> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'users/' + user.id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('session'),
        'Content-Type': ' application/json',
      },
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((r) => r as User)
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'users', {
      headers: { Authorization: 'Bearer ' + Cookies.get('session') },
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((r) => r as User[])
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}

export const getUserInfo = async (): Promise<string> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'users/me', {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('session'),
      },
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((u) => u as string)
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}

export const patchUser = async (user: User, roleId: number, add: boolean): Promise<User> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'users/' + user.id, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('session'),
        'Content-Type': ' application/json',
      },
      body: JSON.stringify({ user_id: user.id, role_id: roleId, added: add }),
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((r) => r as User)
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}
