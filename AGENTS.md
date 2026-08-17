# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Don't fold `init/initializeArchivebox.ts` into the action it exists for.** A cold `archivebox init --quick` regularly runs past the SDK's 30-second exec limit, so doing it inside `set-admin-password` gets the action SIGKILL'd mid-write.
- **The store file is deliberately `.startos-store.json`, not `store.json`.** It shares the volume with ArchiveBox's collection at `/data`, and the dot keeps it out of the user's archive listing. Renaming it to match the rest of the fleet puts StartOS state in the middle of their files.
