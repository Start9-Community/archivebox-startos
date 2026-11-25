import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.73:3',
  releaseNotes: {
    en_US: 'The snapshot list requires the ArchiveBox login.',
    es_ES: 'La lista de capturas requiere el inicio de sesión de ArchiveBox.',
    de_DE: 'Die Snapshot-Liste erfordert die ArchiveBox-Anmeldung.',
    pl_PL: 'Lista zrzutów wymaga logowania do ArchiveBox.',
    fr_FR: 'La liste des instantanés nécessite la connexion à ArchiveBox.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
