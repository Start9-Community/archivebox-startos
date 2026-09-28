<p align="center">
  <img src="icon.png" alt="ArchiveBox Logo" width="21%">
</p>

# ArchiveBox on StartOS

> Everything not listed in this document should behave the same as upstream
> ArchiveBox. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[ArchiveBox](https://github.com/ArchiveBox/ArchiveBox) is a self-hosted internet archiver: it takes URLs you feed it and saves each one as HTML, PDF, screenshot, WARC, and media, then indexes the results so they stay readable offline. This package runs the upstream image unmodified and adds the one thing the image cannot do for itself — provision the admin account.

- **Upstream repo:** <https://github.com/ArchiveBox/ArchiveBox>
- **Wrapper repo:** <https://github.com/Start9-Community/archivebox-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

One upstream image, unmodified, running its own entrypoint.

| Property      | Value                                                  |
| ------------- | ------------------------------------------------------ |
| Image         | `archivebox/archivebox`                                |
| Architectures | x86_64, aarch64                                        |
| Entrypoint    | Upstream's, via `sdk.useEntrypoint()` — not overridden |

| Subcontainer      | Purpose                                                                   |
| ----------------- | ------------------------------------------------------------------------- |
| `archivebox-sub`  | The `migrate` oneshot, then the `primary` daemon — the one to `attach` to |
| `archivebox-init` | Temporary, install only: seeds the index                                  |

The action below also runs in a temporary subcontainer of its own, named for the action.

Upstream's entrypoint (`dumb-init -- /app/bin/docker_entrypoint.sh`) repairs ownership of the top-level `/data` directories, drops to the `archivebox` user, and runs `archivebox server --init 0.0.0.0:8000`, which applies any pending database migrations and then serves the web interface. The daemon overrides only the listen port — upstream's default is 5797 — so the interface's port, and therefore every address StartOS assigned it, stays stable across updates. The temporary subcontainers call the same entrypoint script as root, so every command runs as the `archivebox` user against a correctly owned collection.

Two environment variables are set on both the oneshot and the daemon:

| Variable               | Value                       | Why                                                                                                                                 |
| ---------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `ALLOWED_HOSTS`        | `*`                         | StartOS decides which addresses reach the service; ArchiveBox's own allowlist would only reject an address the OS already permitted |
| `SERVER_SECURITY_MODE` | `safe-onedomain-nojsreplay` | Serves the admin, API and archived content on whichever address the browser used, with no `BASE_URL` and no wildcard subdomains     |

`BASE_URL` is left unset. Upstream's default `auto` mode wants one canonical URL with `admin.`/`web.`/`api.` subdomains beneath it, and a StartOS service is reached on several addresses at once (LAN, IP, Tor, custom domains) — pinning any one would break the others. With `BASE_URL` unset, ArchiveBox honours the proxy's `X-Forwarded-Proto`, so logins over HTTPS pass Django's CSRF origin check.

## Volume and Data Layout

One volume, holding the whole ArchiveBox collection.

| Volume | Mount Point | Purpose                                                             |
| ------ | ----------- | ------------------------------------------------------------------- |
| `main` | `/data`     | Snapshots, the SQLite index, ArchiveBox's own config, and the store |

Everything ArchiveBox writes lives here, so the volume grows with the archive rather than with usage — a collection of large pages with media extractors enabled is measured in gigabytes.

## File Models

One model, and it records a credential rather than owning it.

| File                  | Format | Modelled                | Written by                    |
| --------------------- | ------ | ----------------------- | ----------------------------- |
| `.startos-store.json` | JSON   | Yes — `FileHelper.json` | The Set Admin Password action |

It sits at `/data/.startos-store.json` — inside the collection volume, dot-prefixed so it does not appear among ArchiveBox's own files. It holds one field, `adminPassword`.

**The store is not the authority on the password.** The password lives in ArchiveBox's Django auth database; the store keeps a copy so the value can be shown again and so install can tell whether the account has been provisioned at all. Editing the file by hand therefore changes nothing about signing in — it only changes what StartOS believes. Deleting it re-raises the setup task on the next init, and running the action from there rotates the real password to match.

ArchiveBox's own configuration is not modelled. Every `ARCHIVEBOX_*` setting is managed through the application's admin pages and persists in the volume, so this package neither seeds nor rewrites it.

## Dependencies

None.

## Network Access and Interfaces

One interface, serving the archive, the Django admin pages, and the REST API at `/api/v1/` that the official ArchiveBox mobile and desktop apps connect to. The apps authenticate with a token created under `/admin/api/apitoken/`.

| Interface | Id   | Type | Port | Description                     |
| --------- | ---- | ---- | ---- | ------------------------------- |
| Web UI    | `ui` | ui   | 8000 | The web interface of ArchiveBox |

The port is bound on the `ui-multi` MultiHost over HTTP and is not masked.

## Installation and First-Run Flow

Install does two things upstream leaves to the operator, then hands the account over to the user.

First it runs `archivebox init --quick` in a temporary subcontainer, so the SQLite index exists before anything else touches it. Then it checks the store, finds no password, and raises a `critical` task for [Set Admin Password](#actions).

The index is seeded here rather than left to the action because a cold `archivebox init --quick` routinely runs longer than the SDK's 30-second exec limit, and the action would be killed mid-write. By the time the user runs it, the only work left is the password.

### Upgrading from 0.7.x

Updating a 0.7.x install needs nothing from the user, but the first start is slow. The `migrate` oneshot runs `archivebox update --migrate-only`, which applies the 0.9 database migrations and then moves every snapshot from `archive/<timestamp>/` to `archive/users/<username>/snapshots/<YYYYMMDD>/<domain>/<uuid>/`. On a large collection this takes minutes to hours; the service shows as starting until it finishes, and it resumes where it left off if interrupted. On every later start the oneshot finds nothing to move and exits in seconds.

The conversion cannot be reversed, so the package cannot be downgraded to 0.7.x. Restoring a pre-update backup is the only way back.

## Actions

One action, and it is both the setup step and the rotation step.

### Set Admin Password

Generates a 32-character random password and applies it to the `admin` account. Run it when its task appears, and any time afterwards to rotate the password.

- **What it changes:** the `admin` user in ArchiveBox's Django auth database — created with staff and superuser rights if absent — and `adminPassword` in the store.
- **Availability:** any status; it works on a stopped service because it writes to the database directly rather than through the running server.
- **Cost:** seconds. It does not interrupt the service.
- **Repeat safety:** idempotent in effect, but **not** repeatable in value — each run generates a new password and invalidates the previous one.
- **Outputs:** the username (`admin`) and the new password, shown once. Nothing displays it again; the store holds it but the action result is the only place it is surfaced.

## Tasks

One task, raised at install and again whenever the store has no password.

| Task               | Severity   | Raised when                                | Cleared when    |
| ------------------ | ---------- | ------------------------------------------ | --------------- |
| Set Admin Password | `critical` | Init finds no `adminPassword` in the store | The action runs |

`critical` blocks the service from starting and suspends the ordinary controls, so a fresh install shows the task and nothing else. That is the intended first-run experience: there is no default password to fall back on, and ArchiveBox's own signup path is not exposed.

The check runs on **every** init, not only on install, so deleting the store brings the task back rather than leaving the service unstartable with no prompt.

## Health Checks

One check, on the only daemon. The `migrate` oneshot must exit successfully before the daemon starts; if it fails, the service log shows upstream's error.

| Check     | Displayed as    | Method                 | Grace Period |
| --------- | --------------- | ---------------------- | ------------ |
| `primary` | "Web Interface" | Port 8000 is listening | 60s          |

The 60-second grace covers upstream's start-up index verification, which runs before the server binds. A failure past that point means the daemon did not come up — read the service logs, since the check itself only reports whether the port is open.

## Backups and Restore

The `main` volume is copied wholesale — `sdk.Backups.ofVolumes('main')`. Nothing is dumped and nothing is excluded, so the backup is the archive: snapshots, the SQLite index, ArchiveBox's configuration, and the store.

A restored instance needs nothing done to it. The admin password comes back with the auth database, which is inside the same volume, so the credential from the backup is still the one that works.

Backups scale with the collection, which is the practical constraint here — a large archive is a large backup every time, because there is no incremental path.

## Limitations and Differences

1. **Only the admin password is exposed as an action.** Every other ArchiveBox setting is configured through the application's own admin pages rather than through StartOS.
2. **The admin account is the only one this package provisions.** Additional users are created from within ArchiveBox.
3. **There is no way to set a chosen password.** The action generates one; it does not accept input.
4. **Archived pages' JavaScript is not replayed.** `safe-onedomain-nojsreplay` serves saved HTML without running its scripts, because they would share an origin with the admin session. Screenshots, PDFs, SingleFile, WARC/WACZ and media outputs are unaffected. Full replay needs upstream's wildcard-subdomain mode, which StartOS does not provide.
5. **`SERVER_SECURITY_MODE` cannot be changed from the admin UI.** It is set by environment variable, which overrides ArchiveBox's own config.
6. **Links in the Archive Results table on a snapshot's admin edit page point at `http://archivebox.localhost:8000`.** Upstream builds those links without the request, so with `BASE_URL` unset they fall back to its local default. The snapshot view page and its outputs link correctly; open results from there.

---

## Quick Reference for AI Consumers

```yaml
package_id: archivebox
image: archivebox/archivebox
architectures:
  - x86_64
  - aarch64
subcontainers:
  - archivebox-sub # the migrate oneshot, then the primary daemon
  - archivebox-init # temporary, install only
volumes:
  main: /data
file_models:
  - .startos-store.json
startos_managed_env_vars:
  - ALLOWED_HOSTS
  - SERVER_SECURITY_MODE
dependencies: []
interfaces:
  ui: { type: ui, port: 8000 }
oneshots:
  - migrate # archivebox update --migrate-only
actions:
  - set-admin-password
tasks:
  - { action: set-admin-password, severity: critical }
health_checks:
  - primary # displayed "Web Interface"
```
