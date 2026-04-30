import { VersionInfo } from '@start9labs/start-sdk'

export const v_0_7_3 = VersionInfo.of({
  version: '0.7.3:0',
  releaseNotes: {
    en_US: 'Initial StartOS release of ArchiveBox.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: async ({ effects }) => {},
  },
})
