# CLAUDE.md

See [CONTRIBUTING.md](CONTRIBUTING.md) for the doc map and contribution workflow.

## Operating rules

- **Admin password is managed by an action, not env vars.** A `set-admin-password` action generates and applies the Django superuser password on first run and on rotation; a critical task surfaces the action when `storeJson.adminPassword` is unset. Don't reach for the upstream image's `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars — they only seed on the very first `init --quick`, so they can't cover rotation.
