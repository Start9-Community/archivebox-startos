import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.70:0',
  releaseNotes: {
    en_US:
      'Updates ArchiveBox to 0.9.70, which adds the REST API used by the official mobile and desktop apps. The first start after updating converts the collection to the 0.9 format and can take a long time on a large archive. The conversion cannot be undone, so back up ArchiveBox before updating.',
    es_ES:
      'Actualiza ArchiveBox a 0.9.70, que añade la API REST que usan las aplicaciones oficiales para móvil y escritorio. El primer inicio tras la actualización convierte la colección al formato 0.9 y puede tardar mucho en un archivo grande. La conversión no se puede deshacer, así que haga una copia de seguridad de ArchiveBox antes de actualizar.',
    de_DE:
      'Aktualisiert ArchiveBox auf 0.9.70, das die REST-API für die offiziellen Mobil- und Desktop-Apps mitbringt. Der erste Start nach dem Update wandelt die Sammlung in das 0.9-Format um und kann bei einem großen Archiv lange dauern. Die Umwandlung lässt sich nicht rückgängig machen, sichern Sie ArchiveBox daher vor dem Update.',
    pl_PL:
      'Aktualizuje ArchiveBox do wersji 0.9.70, która dodaje REST API używane przez oficjalne aplikacje mobilne i desktopowe. Pierwsze uruchomienie po aktualizacji konwertuje kolekcję do formatu 0.9 i przy dużym archiwum może trwać długo. Konwersji nie da się cofnąć, więc przed aktualizacją wykonaj kopię zapasową ArchiveBox.',
    fr_FR:
      "Met à jour ArchiveBox vers 0.9.70, qui ajoute l'API REST utilisée par les applications officielles mobiles et de bureau. Le premier démarrage après la mise à jour convertit la collection au format 0.9 et peut être long sur une grande archive. La conversion est irréversible : sauvegardez ArchiveBox avant de mettre à jour.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
