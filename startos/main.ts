import { i18n } from './i18n'
import { sdk } from './sdk'
import { env, mounts, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting ArchiveBox'))

  const subcontainer = sdk.SubContainer.of(
    effects,
    { imageId: 'archivebox' },
    mounts,
    'archivebox-sub',
  )

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: {
      command: sdk.useEntrypoint([
        'archivebox',
        'server',
        '--init',
        `0.0.0.0:${uiPort}`,
      ]),
      env,
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
