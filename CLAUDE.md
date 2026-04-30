## How the upstream version is pulled
- dockerTag in `startos/manifest/index.ts`: `archivebox/archivebox:<version>`

## Default credentials
- On install, the package initializes `/data` and creates a Django superuser:
  - username: `admin`
  - password: `archivebox-admin`
- Users are expected to change the password immediately on first login.
