import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'archivebox',
  title: 'ArchiveBox',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9-Community/archivebox-startos',
  upstreamRepo: 'https://github.com/ArchiveBox/ArchiveBox',
  marketingUrl: 'https://archivebox.io/',
  donationUrl: 'https://github.com/sponsors/pirate',
  description: { short, long },
  volumes: ['main'],
  images: {
    archivebox: {
      source: {
        dockerTag: 'archivebox/archivebox:0.7.3',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
