# ArchiveBox

## Documentation

- [ArchiveBox Wiki](https://github.com/ArchiveBox/ArchiveBox/wiki) — upstream documentation: setup notes, configuration reference, usage tips, and troubleshooting.

## What you get on StartOS

- A **Web UI** for ArchiveBox — browse your archive, queue new URLs, and view saved snapshots (HTML, screenshots, PDFs, media, WARC, and more).
- A single data volume holding the ArchiveBox collection — your snapshots, index, and configuration all live there and are included in backups.
- A **Set Admin Password** action that generates and applies the admin password — surfaced automatically on install, available later for rotation.

## Getting set up

1. Open the **Tasks** panel for ArchiveBox and run the **Set Admin Password** task. The action will display a randomly generated password — save it somewhere you can find it later.
2. Start ArchiveBox and open the **Web UI** from the **Dashboard** tab.
3. Sign in with username `admin` and the password from step 1.
4. From the top navigation, use **Add** to submit your first URL. ArchiveBox queues it, fetches the page, and stores the snapshot in the collection.

To rotate the admin password later, run the **Set Admin Password** action again from the service's Actions tab. StartOS asks you to confirm first, because the old password stops working.

### Updating from ArchiveBox 0.7

StartOS asks you to confirm before it downloads the update. The update converts your collection to the 0.9 format and can take a long time on a large archive; leave it running until it completes. The conversion cannot be undone.

## Using ArchiveBox

### Web UI

The Web UI is ArchiveBox's primary interface. From there you can:

- **Add** URLs (or paste a list / RSS feed / bookmark export) and choose which extractors to run.
- Browse the **Snapshots** list, filter and search, and open any snapshot to view the saved HTML, screenshot, PDF, media, and WARC outputs.
- Manage tags, public/private visibility, and re-archive jobs from the snapshot detail pages.
- Manage users and permissions from the Django admin pages linked in the top navigation.

### Mobile and desktop apps

The official ArchiveBox apps for iPhone, iPad, Android, macOS, Windows and Linux connect to your server over its REST API. In the Web UI, open the admin pages and create an **API token** (under **API**), then give the app your ArchiveBox **Web UI** address and that token.

### Archived pages

Saved pages open without running their original JavaScript. Screenshots, PDFs, SingleFile, WARC/WACZ and media captures show the page as it was.

For headless workflows (CLI usage, scheduled imports, custom extractor configuration, programmatic API calls), see the upstream Wiki linked above.

### Actions

- **Set Admin Password** — generates a fresh random password, applies it to ArchiveBox's auth DB, and displays it once. Run it the first time to provision the admin account; run it again any time you want to rotate the password.
