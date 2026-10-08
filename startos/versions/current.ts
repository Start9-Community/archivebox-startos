import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.9.73:0',
  releaseNotes: {
    en_US: `Updated ArchiveBox to 0.9.73.

- New: save Google Docs, Sheets, Slides, Google Drive and Dropbox files, and a mobile-layout capture so saved pages replay better on phones.
- Faster adding and browsing of URLs in large archives, with lower memory use during long captures.
- A better file browser inside snapshot cards, and a cleaner layout on narrow screens.
- Fix: deleting many snapshots at once no longer crashes.
- Fix: URLs containing apostrophes are imported intact.
- Set Admin Password asks for confirmation before it replaces an existing password.

Full release notes: https://github.com/ArchiveBox/ArchiveBox/releases`,
    es_ES: `Actualiza ArchiveBox a 0.9.73.

- Nuevo: guarda archivos de Google Docs, Sheets, Slides, Google Drive y Dropbox, y una captura con diseño móvil para que las páginas guardadas se vean mejor en el teléfono.
- Añadir y explorar URL en archivos grandes es más rápido, con menos uso de memoria en capturas largas.
- Un mejor explorador de archivos dentro de las tarjetas de instantáneas y un diseño más limpio en pantallas estrechas.
- Corrección: eliminar muchas instantáneas a la vez ya no provoca un fallo.
- Corrección: las URL que contienen apóstrofos se importan completas.
- Set Admin Password pide confirmación antes de reemplazar una contraseña existente.

Notas de la versión completas: https://github.com/ArchiveBox/ArchiveBox/releases`,
    de_DE: `Aktualisiert ArchiveBox auf 0.9.73.

- Neu: Speichert Dateien aus Google Docs, Sheets, Slides, Google Drive und Dropbox sowie eine Aufnahme im Mobil-Layout, damit gespeicherte Seiten auf dem Smartphone besser dargestellt werden.
- Schnelleres Hinzufügen und Durchsuchen von URLs in großen Archiven, mit geringerem Speicherverbrauch bei langen Aufnahmen.
- Ein besserer Dateibrowser in den Snapshot-Karten und ein aufgeräumteres Layout auf schmalen Bildschirmen.
- Fehlerbehebung: Das gleichzeitige Löschen vieler Snapshots führt nicht mehr zum Absturz.
- Fehlerbehebung: URLs mit Apostrophen werden vollständig importiert.
- „Set Admin Password“ fragt nach einer Bestätigung, bevor ein bestehendes Passwort ersetzt wird.

Vollständige Versionshinweise: https://github.com/ArchiveBox/ArchiveBox/releases`,
    pl_PL: `Aktualizuje ArchiveBox do wersji 0.9.73.

- Nowość: zapisywanie plików z Google Docs, Sheets, Slides, Google Drive i Dropbox oraz przechwytywanie w układzie mobilnym, dzięki któremu zapisane strony lepiej wyświetlają się na telefonie.
- Szybsze dodawanie i przeglądanie adresów URL w dużych archiwach oraz mniejsze zużycie pamięci przy długich przechwytywaniach.
- Lepsza przeglądarka plików w kartach migawek i czytelniejszy układ na wąskich ekranach.
- Poprawka: usuwanie wielu migawek naraz nie powoduje już awarii.
- Poprawka: adresy URL zawierające apostrofy są importowane w całości.
- „Set Admin Password” prosi o potwierdzenie przed zastąpieniem istniejącego hasła.

Pełne informacje o wydaniu: https://github.com/ArchiveBox/ArchiveBox/releases`,
    fr_FR: `Met à jour ArchiveBox vers 0.9.73.

- Nouveau : enregistre les fichiers Google Docs, Sheets, Slides, Google Drive et Dropbox, ainsi qu'une capture en mise en page mobile pour que les pages enregistrées s'affichent mieux sur téléphone.
- Ajout et consultation des URL plus rapides dans les grandes archives, avec une consommation de mémoire réduite lors des longues captures.
- Un meilleur explorateur de fichiers dans les cartes d'instantanés et une mise en page plus soignée sur les écrans étroits.
- Correctif : supprimer de nombreux instantanés à la fois ne provoque plus de plantage.
- Correctif : les URL contenant des apostrophes sont importées en entier.
- Set Admin Password demande une confirmation avant de remplacer un mot de passe existant.

Notes de version complètes : https://github.com/ArchiveBox/ArchiveBox/releases`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
