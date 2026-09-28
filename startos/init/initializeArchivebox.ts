import { sdk } from '../sdk'
import { entrypoint, mounts } from '../utils'

// A cold `archivebox init` can outlast the 30s action exec limit, so the
// index must exist before the `set-admin-password` task can be run.
export const initializeArchivebox = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'archivebox' },
    mounts,
    'archivebox-init',
    (sub) =>
      sub.execFail(
        [entrypoint, 'archivebox', 'init', '--quick'],
        { user: 'root' },
        null,
      ),
  )
})
