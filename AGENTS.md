# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `archivebox`.** Single `ui` interface on port 8000 (`ui-multi` MultiHost). No dependencies and nothing depends on it.
- The admin account is provisioned by the `set-admin-password` action (surfaced as a critical task on first run), not by env-var seeding. `setupOnInit` pre-creates the SQLite index and fixes `/data` ownership on install so that action completes within the exec timeout.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach archivebox -n archivebox-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `archivebox-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
