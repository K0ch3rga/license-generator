// const BACKEND_CONNECTION = import.meta.env.VITE_BACKEND_CONNECTION
const url = import.meta.url.match(/^(https?:\/\/)(?:www\.)?([^/]+)/)
const BACKEND_CONNECTION = [url?.[0], '/api/'].join('')

export { BACKEND_CONNECTION }
