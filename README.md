<p align="center">
  <img src="icon.png" alt="ArchiveBox Logo" width="21%">
</p>

# ArchiveBox on StartOS

> **Upstream docs:** <https://github.com/ArchiveBox/ArchiveBox/wiki>
>
> Everything not listed in this document should behave the same as upstream
> ArchiveBox. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable.

[ArchiveBox](https://archivebox.io/) is a powerful, self-hosted internet archiving solution to collect, save, and view websites you want to preserve offline. It saves snapshots of URLs you feed it in HTML, PDF, screenshot, WARC, and other formats.

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Actions (StartOS UI)](#actions-startos-ui)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Dependencies](#dependencies)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Contributing](#contributing)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property      | Value                                                  |
| ------------- | ------------------------------------------------------ |
| Image         | `archivebox/archivebox` (upstream unmodified)          |
| Architectures | x86_64, aarch64                                        |
| Entrypoint    | Upstream `dumb-init -- docker_entrypoint.sh` + default CMD, run via `sdk.useEntrypoint()` |

The upstream entrypoint fixes ownership of `/data`, drops to the `archivebox` user via `gosu`, then runs the default `archivebox server --quick-init` command. `--quick-init` performs `archivebox init --quick` on first launch, which is idempotent on subsequent launches.

---

## Volume and Data Layout

| Volume | Mount Point | Purpose                                          |
| ------ | ----------- | ------------------------------------------------ |
| `main` | `/data`     | ArchiveBox collection (snapshots + SQLite index) |

StartOS state for the package is stored at `/data/.startos-store.json` (hidden) — currently just the admin password set by the `Set Admin Password` action.

---

## Installation and First-Run Flow

On install the package runs `archivebox init --quick` once in a temp subcontainer to pre-create the SQLite index, then files a **critical task** prompting the user to run **Set Admin Password**. The service cannot start until that task completes.

Running the task:

1. Generates a random 32-character admin password.
2. Creates the Django superuser `admin` (or rotates its password if it already exists) directly against ArchiveBox's auth DB.
3. Stores the password in `/data/.startos-store.json` and displays it once.

After the task completes, start the service, open the Web UI, and sign in. To rotate the admin password later, re-run the **Set Admin Password** action.

---

## Configuration Management

All ArchiveBox configuration is managed through the **upstream web UI** and ArchiveBox's own admin pages. The package sets one env var on the daemon:

| Env Var          | Value     | Purpose                                            |
| ---------------- | --------- | -------------------------------------------------- |
| `ALLOWED_HOSTS`  | `*`       | Accept LAN, `.local`, `.onion`, and custom domains |

The admin password is **not** passed via env var — it's set in ArchiveBox's Django auth DB by the `Set Admin Password` action, so the same code path covers first-set and rotation.

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose                |
| --------- | ---- | -------- | ---------------------- |
| Web UI    | 8000 | HTTP     | ArchiveBox web console |

---

## Actions (StartOS UI)

| Action             | Purpose                                                                                    | Visibility | Allowed When |
| ------------------ | ------------------------------------------------------------------------------------------ | ---------- | ------------ |
| Set Admin Password | Generates a new random admin password, applies it to ArchiveBox, and displays it. Used for both first-time setup (surfaced as a critical task on install) and later password rotation. | Enabled    | Any status   |

---

## Backups and Restore

**Backed up:** the entire `main` volume — the SQLite database, all archived snapshots (HTML, PDF, screenshot, media, WARC), any user configuration written under `/data`, and the StartOS `.startos-store.json` state file.

**Restore behavior:** restoring overwrites current data with the backup copy. The admin password from the backup is restored along with the rest of the collection.

---

## Health Checks

| Check         | Method                | Grace Period | Messages                                                        |
| ------------- | --------------------- | ------------ | --------------------------------------------------------------- |
| Web Interface | Port listening (8000) | 60 seconds   | "The web interface is ready" / "The web interface is not ready" |

The grace period accommodates first-launch `archivebox init --quick` verification.

---

## Dependencies

None.

---

## Limitations and Differences

1. This is an MVP packaging — only the admin-password action is exposed. Advanced ArchiveBox configuration (e.g. `ARCHIVEBOX_*` env vars beyond `ALLOWED_HOSTS`) is not surfaced; defaults are used.
2. Outgoing network access depends on StartOS network configuration. Some archive methods (e.g. media downloads) may fail without proper egress.

---

## What Is Unchanged from Upstream

- ArchiveBox itself runs unmodified from the official `archivebox/archivebox` image.
- Snapshot creation, extractors, indexing, and search behave as upstream documents.
- The Django admin pages, REST API, and CLI behave as upstream documents.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions.

---

## Quick Reference for AI Consumers

```yaml
package_id: archivebox
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports:
  ui: 8000
dependencies: none
startos_managed_env_vars:
  - ALLOWED_HOSTS
actions:
  - set-admin-password
health_checks:
  - checkPortListening:8000: web_interface (60s grace period)
backup_volumes:
  - main (full volume, including .startos-store.json)
configuration: upstream web UI only
auth:
  admin_username: admin
  admin_password: generated by the `set-admin-password` action (also used for rotation)
```
