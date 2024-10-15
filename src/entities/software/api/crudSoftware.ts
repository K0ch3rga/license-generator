import { BACKEND_CONNECTION } from '@/shared/config'
import { Cookies } from 'quasar'
import { type Software } from '../'
import type { NewSoftwareDto } from '../model/Software'
export const createSoftware = async (software: NewSoftwareDto): Promise<Software> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'software', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('session'),
        'Content-Type': ' application/json',
      },
      body: JSON.stringify(software),
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((r) => r as Software)
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}

export const deleteSoftware = async (software: Software): Promise<Software> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'software/' + software.id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('session'),
        'Content-Type': ' application/json',
      },
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((r) => r as Software)
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}

export const getAllSoftwares = async (): Promise<Software[]> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'software', {
      headers: { Authorization: 'Bearer ' + Cookies.get('session') },
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((r) => r as Software[])
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}

export const editSoftwareOption = async (
  software: Software,
  option: string,
  add: boolean
): Promise<Software> => {
  try {
    return await fetch(BACKEND_CONNECTION + 'software', {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + Cookies.get('session'),
        'Content-Type': ' application/json',
      },
      body: JSON.stringify({
        id: software.id,
        required_attributes: add
          ? software.required_attributes.concat(option)
          : software.required_attributes.filter((v) => v != option),
      }),
    })
      .then((r) => (r.ok ? r : Promise.reject(r.status)))
      .then((r) => r.json())
      .then((r) => r as Software)
      .catch((e) => Promise.reject(e))
  } catch (e) {
    console.log(e)
    return Promise.reject(600)
  }
}
