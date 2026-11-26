import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.77:0',
  releaseNotes: {
    en_US: `Updated ArchiveBox to 0.9.77.

- New: AI-assisted importers that back up posts, bookmarks and likes from X, Facebook, Instagram, Reddit and other sites, plus RSS feeds and spreadsheets, on a schedule
- New: an optional chat bot for saving links from Slack, Telegram, WhatsApp, Zulip and more
- New: Memento API support
- Faster archiving, especially on slower disks and with long queues
- Saved pages replay more completely, and large collections browse faster
- Security: stronger protection of private captures, browser cookies and server files

[Full release notes](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.76) · [0.9.77](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.77)`,
    es_ES: `ArchiveBox actualizado a 0.9.77.

- Nuevo: importadores asistidos por IA que respaldan publicaciones, marcadores y me gusta de X, Facebook, Instagram, Reddit y otros sitios, además de feeds RSS y hojas de cálculo, de forma programada
- Nuevo: un bot de chat opcional para guardar enlaces desde Slack, Telegram, WhatsApp, Zulip y más
- Nuevo: compatibilidad con la API Memento
- Archivado más rápido, sobre todo en discos lentos y con colas largas
- Las páginas guardadas se reproducen de forma más completa y las colecciones grandes se exploran más rápido
- Seguridad: mayor protección de las capturas privadas, las cookies del navegador y los archivos del servidor

[Notas completas](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.76) · [0.9.77](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.77)`,
    de_DE: `ArchiveBox auf 0.9.77 aktualisiert.

- Neu: KI-gestützte Importer, die Beiträge, Lesezeichen und Likes von X, Facebook, Instagram, Reddit und anderen Seiten sowie RSS-Feeds und Tabellen nach Zeitplan sichern
- Neu: ein optionaler Chat-Bot zum Speichern von Links aus Slack, Telegram, WhatsApp, Zulip und mehr
- Neu: Unterstützung der Memento-API
- Schnelleres Archivieren, vor allem auf langsamen Datenträgern und bei langen Warteschlangen
- Gespeicherte Seiten werden vollständiger wiedergegeben, und große Sammlungen lassen sich schneller durchsuchen
- Sicherheit: besserer Schutz privater Aufnahmen, Browser-Cookies und Serverdateien

[Vollständige Versionshinweise](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.76) · [0.9.77](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.77)`,
    pl_PL: `Zaktualizowano ArchiveBox do 0.9.77.

- Nowość: importery wspomagane przez AI, które według harmonogramu archiwizują posty, zakładki i polubienia z X, Facebooka, Instagrama, Reddita i innych serwisów, a także kanały RSS i arkusze kalkulacyjne
- Nowość: opcjonalny bot czatu do zapisywania linków ze Slacka, Telegrama, WhatsAppa, Zulipa i innych
- Nowość: obsługa API Memento
- Szybsza archiwizacja, zwłaszcza na wolnych dyskach i przy długich kolejkach
- Zapisane strony odtwarzają się pełniej, a duże kolekcje przegląda się szybciej
- Bezpieczeństwo: lepsza ochrona prywatnych zrzutów, plików cookie przeglądarki i plików serwera

[Pełne informacje o wydaniu](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.76) · [0.9.77](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.77)`,
    fr_FR: `ArchiveBox mis à jour vers 0.9.77.

- Nouveau : des importateurs assistés par IA qui sauvegardent selon un calendrier les publications, favoris et mentions J'aime de X, Facebook, Instagram, Reddit et d'autres sites, ainsi que des flux RSS et des feuilles de calcul
- Nouveau : un bot de discussion facultatif pour enregistrer des liens depuis Slack, Telegram, WhatsApp, Zulip et plus
- Nouveau : prise en charge de l'API Memento
- Archivage plus rapide, surtout sur des disques lents et avec de longues files d'attente
- Les pages enregistrées s'affichent plus fidèlement et les grandes collections se parcourent plus vite
- Sécurité : meilleure protection des captures privées, des cookies du navigateur et des fichiers du serveur

[Notes de version complètes](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.76) · [0.9.77](https://github.com/ArchiveBox/ArchiveBox/releases/tag/v0.9.77)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
