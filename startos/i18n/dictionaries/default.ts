export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting ArchiveBox': 0,
  'Web Interface': 1,
  'The web interface is ready': 2,
  'The web interface is not ready': 3,

  // interfaces.ts
  'Web UI': 4,
  'The web interface of ArchiveBox': 5,

  // actions/setAdminPassword.ts
  'Set Admin Password': 6,
  'Generate a new random password for the ArchiveBox admin account. Replaces any existing password.': 7,
  'ArchiveBox Login Credentials': 8,
  'Use these credentials to sign in to ArchiveBox.': 9,
  Username: 10,
  Password: 11,

  // init/watchCredentials.ts
  'Set the admin password before signing in to ArchiveBox': 12,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
