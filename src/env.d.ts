/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_CDN_BASE_URL: string
  readonly VITE_APP_FILE_PREFIX: string
  readonly VITE_HISTORICAL_VERSIONS: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_DEV_PORT: string
  readonly VITE_PREVIEW_PORT: string
  readonly VITE_DROP_CONSOLE: string
  readonly VITE_BUILD_GZIP: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
