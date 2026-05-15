import { sdk } from '../sdk'
import { mounts } from '../utils'

// On install, pre-create the SQLite index and fix /data ownership so the
// `set-admin-password` action — which is surfaced as a critical task on first
// run — completes quickly. Without this, the action's temp subcontainer would
// have to do `archivebox init --quick` itself, which routinely exceeds the
// SDK's 30s exec timeout on a cold DB and gets SIGKILL'd.
export const initializeArchivebox = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  await sdk.SubContainer.withTemp(
    effects,
    { imageId: 'archivebox' },
    mounts,
    'archivebox-init',
    async (sub) => {
      await sub.execFail(
        ['chown', '-R', 'archivebox:archivebox', '/data'],
        { user: 'root' },
        null,
      )
      await sub.execFail(
        ['archivebox', 'init', '--quick'],
        { user: 'archivebox' },
        null,
      )
    },
  )
})
