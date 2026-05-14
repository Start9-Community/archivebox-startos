## How the upstream version is pulled
- dockerTag in `startos/manifest/index.ts`: `archivebox/archivebox:<version>`

## Admin credentials
- A `set-admin-password` action generates and applies the Django superuser password on first run and on rotation. A critical task surfaces the action when `storeJson.adminPassword` is unset.
- The action runs `archivebox init --quick` then sets the password via `archivebox manage shell` in a temp subcontainer — same code path for first-set and rotation.
- The upstream image's `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars are intentionally not used; they only seed on the very first `init --quick`, so they can't cover rotation.
