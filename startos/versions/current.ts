import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.7.4:0',
  releaseNotes: {
    en_US:
      'Updated ArchiveBox to 0.7.4. Refreshes the bundled archiving tools inside the Docker image — SingleFile, YT-DLP, Chrome, Node, gosu, and other dependencies. See https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.7.4',
    es_ES:
      'Actualizado ArchiveBox a 0.7.4. Actualiza las herramientas de archivado incluidas en la imagen Docker: SingleFile, YT-DLP, Chrome, Node, gosu y otras dependencias. Consulte https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.7.4',
    de_DE:
      'ArchiveBox auf 0.7.4 aktualisiert. Aktualisiert die im Docker-Image enthaltenen Archivierungswerkzeuge: SingleFile, YT-DLP, Chrome, Node, gosu und weitere Abhängigkeiten. Siehe https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.7.4',
    pl_PL:
      'Zaktualizowano ArchiveBox do 0.7.4. Odświeża narzędzia archiwizujące dołączone do obrazu Docker: SingleFile, YT-DLP, Chrome, Node, gosu i inne zależności. Zobacz https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.7.4',
    fr_FR:
      'Mise à jour d’ArchiveBox vers 0.7.4. Actualise les outils d’archivage inclus dans l’image Docker : SingleFile, YT-DLP, Chrome, Node, gosu et autres dépendances. Voir https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.7.4',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
