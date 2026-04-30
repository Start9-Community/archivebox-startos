import { sdk } from './sdk'

export const uiPort = 8000
export const dataPath = '/data'
export const adminUsername = 'admin'
// Default password — user is prompted to change on first login.
export const defaultAdminPassword = 'archivebox-admin'

export const mounts = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: dataPath,
  readonly: false,
})
