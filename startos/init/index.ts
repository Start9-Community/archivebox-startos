import { sdk } from '../sdk'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'

// No on-install setup is needed: the upstream Docker entrypoint provisions
// the data directory and creates the superuser from ADMIN_USERNAME /
// ADMIN_PASSWORD env vars on first run of the main daemon.
export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  setInterfaces,
  setDependencies,
  actions,
)

export const uninit = sdk.setupUninit(versionGraph)
