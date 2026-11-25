import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.73:3',
  releaseNotes: {
    en_US: 'The snapshot list requires the ArchiveBox login by default; saved publication settings are preserved.',
    es_ES: 'La lista de capturas requiere el inicio de sesión de ArchiveBox de forma predeterminada; se conserva la configuración de publicación guardada.',
    de_DE: 'Die Snapshot-Liste erfordert standardmäßig die ArchiveBox-Anmeldung; gespeicherte Veröffentlichungseinstellungen bleiben erhalten.',
    pl_PL: 'Lista zrzutów domyślnie wymaga logowania do ArchiveBox; zapisane ustawienia publikowania zostają zachowane.',
    fr_FR: 'La liste des instantanés nécessite par défaut la connexion à ArchiveBox ; les paramètres de publication enregistrés sont conservés.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
