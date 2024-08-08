/// <reference types="vite/client" />
/// <reference types="vue-router" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_CONNECTION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
