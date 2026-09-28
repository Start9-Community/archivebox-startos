import { sdk } from './sdk'

export const uiPort = 8000
export const dataPath = '/data'
export const adminUsername = 'admin'
export const entrypoint = '/app/bin/docker_entrypoint.sh'

// StartOS reaches the service on several addresses at once, so no single
// BASE_URL can be pinned; one-domain mode serves every host identically.
export const env = {
  ALLOWED_HOSTS: '*',
  SERVER_SECURITY_MODE: 'safe-onedomain-nojsreplay',
}

export const mounts = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: dataPath,
  readonly: false,
})
