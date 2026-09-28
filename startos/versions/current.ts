import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { entrypoint, mounts } from '../utils'

export const current = VersionInfo.of({
  version: '0.9.70:0',
  releaseNotes: {
    en_US:
      'Updates ArchiveBox to 0.9.70, which adds the REST API used by the official mobile and desktop apps. The update converts the collection to the 0.9 format, which can take a long time on a large archive and cannot be undone.',
    es_ES:
      'Actualiza ArchiveBox a 0.9.70, que añade la API REST que usan las aplicaciones oficiales para móvil y escritorio. La actualización convierte la colección al formato 0.9, lo que puede tardar mucho en un archivo grande y no se puede deshacer.',
    de_DE:
      'Aktualisiert ArchiveBox auf 0.9.70, das die REST-API für die offiziellen Mobil- und Desktop-Apps mitbringt. Das Update wandelt die Sammlung in das 0.9-Format um; das kann bei einem großen Archiv lange dauern und lässt sich nicht rückgängig machen.',
    pl_PL:
      'Aktualizuje ArchiveBox do wersji 0.9.70, która dodaje REST API używane przez oficjalne aplikacje mobilne i desktopowe. Aktualizacja konwertuje kolekcję do formatu 0.9, co przy dużym archiwum może trwać długo i czego nie da się cofnąć.',
    fr_FR:
      "Met à jour ArchiveBox vers 0.9.70, qui ajoute l'API REST utilisée par les applications officielles mobiles et de bureau. La mise à jour convertit la collection au format 0.9, ce qui peut être long sur une grande archive et est irréversible.",
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
            [entrypoint, 'archivebox', 'update', '--migrate-only'],
            { user: 'root' },
            null,
          ),
      )
    },
    down: IMPOSSIBLE,
  },
})
