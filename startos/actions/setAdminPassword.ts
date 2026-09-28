import { utils } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { adminUsername, entrypoint, mounts } from '../utils'

export const setAdminPassword = sdk.Action.withoutInput(
  'set-admin-password',

  async () => ({
    name: i18n('Set Admin Password'),
    description: i18n(
      'Generate a new random password for the ArchiveBox admin account. Replaces any existing password.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const adminPassword = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 32,
    })

    // Written straight to the Django auth DB, so it works whether or not the
    // service is running.
    await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'archivebox' },
      mounts,
      'set-admin-password',
      async (sub) => {
        await sub.execFail(
          [
            entrypoint,
            'archivebox',
            'manage',
            'shell',
            '-c',
            `from django.contrib.auth import get_user_model
U = get_user_model()
u, _ = U.objects.get_or_create(username='${adminUsername}', defaults={'is_staff': True, 'is_superuser': True, 'email': 'admin@archivebox.local'})
u.is_staff = True
u.is_superuser = True
u.set_password('${adminPassword}')
u.save()`,
          ],
          { user: 'root' },
        )
      },
    )

    await storeJson.merge(effects, { adminPassword })

    return {
      version: '1',
      title: i18n('ArchiveBox Login Credentials'),
      message: i18n('Use these credentials to sign in to ArchiveBox.'),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: adminUsername,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: adminPassword,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
