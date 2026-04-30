import { i18n } from './i18n'
import { sdk } from './sdk'
import {
  adminUsername,
  defaultAdminPassword,
  mounts,
  uiPort,
} from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting ArchiveBox'))

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'archivebox' },
    mounts,
    'archivebox-sub',
  )

  // The upstream image has its own entrypoint (`dumb-init -- docker_entrypoint.sh`)
  // which:
  //   - runs as root, fixes ownership of /data, then drops to the `archivebox`
  //     user via `gosu`
  //   - invokes the image's default CMD: `archivebox server --quick-init 0.0.0.0:8000`
  //   - `--quick-init` runs `archivebox init --quick`, which on first launch
  //     reads ADMIN_USERNAME / ADMIN_PASSWORD and creates a Django superuser.
  //
  // We therefore use the image's entrypoint+CMD verbatim and just pass env vars.
  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: {
      command: sdk.useEntrypoint(),
      env: {
        // Accept requests via any hostname (LAN, .local, .onion, custom domain).
        // StartOS handles access control at the network layer.
        ALLOWED_HOSTS: '*',
        // First-run admin credentials — user is told to change on first login.
        ADMIN_USERNAME: adminUsername,
        ADMIN_PASSWORD: defaultAdminPassword,
      },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
