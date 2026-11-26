import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { dataPath, entrypoint, mounts } from '../utils'

// The Default persona stores the PERMISSIONS in effect when it was created, which outranks the daemon's env.
const privateDefaultPersona = `import os, sqlite3
db = '${dataPath}/index.sqlite3'
if os.path.exists(db):
    c = sqlite3.connect(db)
    if c.execute("select 1 from sqlite_master where name = 'personas_persona'").fetchone():
        c.execute("update personas_persona set config = json_set(config, '$.PERMISSIONS', 'private') where lower(name) = 'default' and json_extract(config, '$.PERMISSIONS') = 'public'")
        c.commit()
`

export const v_0_9_73_3 = VersionInfo.of({
  version: '0.9.73:3',
  releaseNotes: {
    en_US:
      "The public snapshot list requires the ArchiveBox login, and new snapshots are private unless you choose another visibility. Existing snapshots keep theirs. A snapshot list you published from ArchiveBox's Machine config editor stays published.",
    es_ES:
      'La lista pública de capturas requiere el inicio de sesión de ArchiveBox, y las capturas nuevas son privadas salvo que elijas otra visibilidad. Las capturas existentes conservan la suya. Si publicaste la lista desde el editor de configuración de Machine de ArchiveBox, sigue publicada.',
    de_DE:
      'Die öffentliche Snapshot-Liste erfordert die ArchiveBox-Anmeldung, und neue Snapshots sind privat, sofern du keine andere Sichtbarkeit wählst. Bestehende Snapshots behalten ihre. Eine Liste, die du im Machine-Konfigurationseditor von ArchiveBox veröffentlicht hast, bleibt veröffentlicht.',
    pl_PL:
      'Publiczna lista zrzutów wymaga logowania do ArchiveBox, a nowe zrzuty są prywatne, chyba że wybierzesz inną widoczność. Istniejące zrzuty zachowują swoją. Lista opublikowana w edytorze konfiguracji Machine w ArchiveBox pozostaje opublikowana.',
    fr_FR:
      "La liste publique des instantanés nécessite la connexion à ArchiveBox, et les nouveaux instantanés sont privés sauf si vous choisissez une autre visibilité. Les instantanés existants conservent la leur. Une liste publiée depuis l'éditeur de configuration Machine d'ArchiveBox reste publiée.",
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.SubContainer.withTemp(
        effects,
        { imageId: 'archivebox' },
        mounts,
        'archivebox-migrate',
        (sub) =>
          sub.execFail(
            [entrypoint, '/venv/bin/python3', '-c', privateDefaultPersona],
            { user: 'root' },
          ),
      )
    },
    down: IMPOSSIBLE,
  },
})
