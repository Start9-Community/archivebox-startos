import { i18n } from '../i18n'
import { sdk } from '../sdk'
import {
  adminUsername,
  defaultAdminPassword,
  mounts,
} from '../utils'

export const setup = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    console.info(i18n('Initializing ArchiveBox data directory'))
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'archivebox' },
      mounts,
      'archivebox-init',
      async (sub) => {
        // Ensure ownership of the data volume.
        await sub.execFail(
          ['chown', '-R', 'archivebox:archivebox', '/data'],
          { user: 'root' },
        )
        // Initialize a fresh ArchiveBox collection in /data.
        await sub.execFail(['archivebox', 'init', '--quick'], {
          user: 'archivebox',
        })
        // Create the default superuser non-interactively.
        await sub.execFail(
          [
            'archivebox',
            'manage',
            'createsuperuser',
            '--noinput',
            '--username',
            adminUsername,
            '--email',
            'admin@archivebox.local',
          ],
          {
            user: 'archivebox',
            env: { DJANGO_SUPERUSER_PASSWORD: defaultAdminPassword },
          },
        )
      },
    )
  }
})
