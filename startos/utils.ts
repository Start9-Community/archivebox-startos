import { sdk } from './sdk'

export const uiPort = 8000
export const dataPath = '/data'
export const adminUsername = 'admin'

export const mounts = sdk.Mounts.of().mountVolume({
  volumeId: 'main',
  subpath: null,
  mountpoint: dataPath,
  readonly: false,
})
