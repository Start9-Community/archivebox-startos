import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.73:1',
  releaseNotes: {
    en_US:
      'Updated start-sdk to 3.0.4 and removed one-time upgrade guidance from the service instructions.',
    es_ES:
      'Actualiza start-sdk a 3.0.4 y elimina de las instrucciones del servicio las indicaciones para una actualización puntual.',
    de_DE:
      'Aktualisiert start-sdk auf 3.0.4 und entfernt Hinweise zu einem einmaligen Upgrade aus der Dienstanleitung.',
    pl_PL:
      'Aktualizuje start-sdk do wersji 3.0.4 i usuwa z instrukcji usługi wskazówki dotyczące jednorazowej aktualizacji.',
    fr_FR:
      'Met à jour start-sdk vers 3.0.4 et retire des instructions du service les indications concernant une mise à niveau ponctuelle.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
