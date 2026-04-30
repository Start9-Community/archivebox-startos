<p align="center">
  <img src="icon.svg" alt="ArchiveBox Logo" width="21%">
</p>

# ArchiveBox on StartOS

> **Upstream repo:** <https://github.com/ArchiveBox/ArchiveBox>

[ArchiveBox](https://archivebox.io/) is a powerful, self-hosted internet archiving solution to collect, save, and view websites you want to preserve offline. It saves snapshots of URLs you feed it in HTML, PDF, screenshot, WARC, and other formats.

## Default credentials

On install, ArchiveBox is initialized with a default Django superuser:

- **Username:** `admin`
- **Password:** `archivebox-admin`

**Change the password immediately** after first login (top-right user menu → Change password).

---

## Image and Container Runtime

| Property      | Value                          |
| ------------- | ------------------------------ |
| Image         | `archivebox/archivebox:0.7.3`  |
| Architectures | x86_64, aarch64                |
| Command       | `archivebox server --quick-init 0.0.0.0:8000` |

---

## Volume and Data Layout

| Volume | Mount Point | Purpose                                       |
| ------ | ----------- | --------------------------------------------- |
| `main` | `/data`     | ArchiveBox collection (snapshots + database)  |

---

## Installation and First-Run Flow

On first start, the upstream entrypoint initializes `/data` (`archivebox init --quick`, triggered by `--quick-init`) and creates the default `admin` superuser from the `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars set by the package. Open the Web UI and log in to begin archiving.

---

## Network Access and Interfaces

| Interface | Port | Protocol | Purpose                |
| --------- | ---- | -------- | ---------------------- |
| Web UI    | 8000 | HTTP     | ArchiveBox web console |

---

## Backups and Restore

**Included in backup:**

- `main` volume (entire ArchiveBox collection, including the SQLite database and all archived snapshots)

---

## Health Checks

| Check         | Method                | Messages |
| ------------- | --------------------- | -------- |
| Web Interface | Port listening (8000) | "The web interface is ready" / "The web interface is not ready" |

---

## Dependencies

None.

---

## Limitations and Differences

1. This is an MVP packaging — no in-UI configuration actions are exposed yet. Advanced ArchiveBox configuration (e.g. `ARCHIVEBOX_*` env vars) is not surfaced; defaults are used.
2. Outgoing network access depends on StartOS network configuration. Some archive methods (e.g. media downloads) may fail without proper egress.

---

## What Is Unchanged from Upstream

- ArchiveBox itself runs unmodified from the official `archivebox/archivebox:0.7.3` image.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for build instructions.

---

## Quick Reference for AI Consumers

```yaml
package_id: archivebox
image: archivebox/archivebox:0.7.3
architectures: [x86_64, aarch64]
volumes:
  main: /data
ports:
  ui: 8000
default_admin:
  username: admin
  password: archivebox-admin   # change on first login
dependencies: none
actions: none
```
