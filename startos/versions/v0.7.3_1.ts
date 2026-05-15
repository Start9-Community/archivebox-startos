import { VersionInfo } from '@start9labs/start-sdk'

export const v_0_7_3_1 = VersionInfo.of({
  version: '0.7.3:1',
  releaseNotes: {
    en_US:
      'Fix `Set Admin Password` action timing out on first run: pre-initialize the SQLite index at install time so the action only writes the password.',
    es_ES:
      'Corrige el tiempo de espera agotado de la acción `Set Admin Password` en la primera ejecución: el índice SQLite se inicializa al instalar, para que la acción solo tenga que escribir la contraseña.',
    de_DE:
      'Behebt das Timeout der Aktion `Set Admin Password` beim ersten Ausführen: Der SQLite-Index wird bereits bei der Installation angelegt, sodass die Aktion nur noch das Passwort schreibt.',
    pl_PL:
      'Naprawia przekroczenie limitu czasu akcji `Set Admin Password` przy pierwszym uruchomieniu: indeks SQLite jest inicjowany podczas instalacji, dzięki czemu akcja tylko zapisuje hasło.',
    fr_FR:
      "Corrige le délai d'attente dépassé de l'action `Set Admin Password` lors de la première exécution : l'index SQLite est initialisé à l'installation pour que l'action n'écrive plus que le mot de passe.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
