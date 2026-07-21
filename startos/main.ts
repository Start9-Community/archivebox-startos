import { i18n } from './i18n'
import { sdk } from './sdk'
import { mounts, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting ArchiveBox'))

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'archivebox' },
    mounts,
    'archivebox-sub',
  )

  // The upstream image's entrypoint (`dumb-init -- docker_entrypoint.sh`)
  // fixes /data ownership, drops to the `archivebox` user via gosu, and runs
  // the default CMD (`archivebox server --quick-init 0.0.0.0:8000`).
  // `archivebox init --quick` is idempotent — the admin user is provisioned
  // by the `setAdminPassword` action, not by env-var seeding.
  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: {
      command: sdk.useEntrypoint(),
      env: {
        // Accept any hostname — StartOS handles access control at the network layer.
        ALLOWED_HOSTS: '*',
      },
    },
    ready: {
      display: i18n('Web Interface'),
      gracePeriod: 60_000,
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
