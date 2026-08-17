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

| Subcontainer      | Purpose                                                              |
| ----------------- | -------------------------------------------------------------------- |
| `archivebox-sub`  | The `primary` daemon — the one to `attach` to                        |
| `archivebox-init` | Temporary, install only: fixes `/data` ownership and seeds the index |

The action below also runs in a temporary subcontainer of its own, named for the action.

Upstream's entrypoint (`dumb-init -- docker_entrypoint.sh`) fixes ownership of `/data`, drops to the `archivebox` user via `gosu`, and runs the default command, which serves the web interface after a quick idempotent index check. The daemon's only environment variable is `ALLOWED_HOSTS=*`: StartOS decides which addresses reach the service, so ArchiveBox's own host allowlist would only ever reject an address the OS had already permitted.

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

One interface, serving the archive and the Django admin pages behind it.

| Interface | Id   | Type | Port | Description                     |
| --------- | ---- | ---- | ---- | ------------------------------- |
| Web UI    | `ui` | ui   | 8000 | The web interface of ArchiveBox |

The port is bound on the `ui-multi` MultiHost over HTTP and is not masked.

## Installation and First-Run Flow

Install does two things upstream leaves to the operator, then hands the account over to the user.

First it runs a temporary subcontainer to `chown` `/data` to the `archivebox` user and run `archivebox init --quick`, so the SQLite index exists before anything else touches it. Then it checks the store, finds no password, and raises a `critical` task for [Set Admin Password](#actions).

The index is seeded here rather than left to the action because a cold `archivebox init --quick` routinely runs longer than the SDK's 30-second exec limit, and the action would be killed mid-write. By the time the user runs it, the only work left is the password.

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

One check, on the only daemon.

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

---

## Quick Reference for AI Consumers

```yaml
package_id: archivebox
image: archivebox/archivebox
architectures:
  - x86_64
  - aarch64
subcontainers:
  - archivebox-sub # the primary daemon
  - archivebox-init # temporary, install only
volumes:
  main: /data
file_models:
  - .startos-store.json
startos_managed_env_vars:
  - ALLOWED_HOSTS
dependencies: []
interfaces:
  ui: { type: ui, port: 8000 }
actions:
  - set-admin-password
tasks:
  - { action: set-admin-password, severity: critical }
health_checks:
  - primary # displayed "Web Interface"
```
