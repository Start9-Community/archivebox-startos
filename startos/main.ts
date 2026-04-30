import { i18n } from './i18n'
import { sdk } from './sdk'
import { mounts, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting ArchiveBox'))

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'archivebox' },
    mounts,
    'archivebox-sub',
  )

  return sdk.Daemons.of(effects)
    .addOneshot('chown', {
      subcontainer,
      exec: {
        command: ['chown', '-R', 'archivebox:archivebox', '/data'],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer,
      exec: {
        command: ['archivebox', 'server', '--quick-init', `0.0.0.0:${uiPort}`],
      },
      ready: {
        display: i18n('Web Interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: ['chown'],
    })
})
