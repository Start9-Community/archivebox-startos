import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  adminPassword: z.string().optional().catch(undefined),
})

// Hidden filename keeps StartOS state out of the visible ArchiveBox
// collection at /data.
export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '.startos-store.json' },
  shape,
)
