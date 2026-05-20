# Updating the upstream version

This package consumes upstream ArchiveBox as a prebuilt Docker image, so the upstream version is pinned in exactly one place.

## Determining the upstream version

- **ArchiveBox Docker image** ([archivebox/archivebox on Docker Hub](https://hub.docker.com/r/archivebox/archivebox/tags), source: [ArchiveBox/ArchiveBox](https://github.com/ArchiveBox/ArchiveBox)) — the tag pulled by `images.archivebox.source.dockerTag` in `startos/manifest/index.ts`. List recent tags with:

  ```sh
  curl -fsSL "https://hub.docker.com/v2/repositories/archivebox/archivebox/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
  ```

  Skip `dev`, `sha-*`, and `*rc*` entries; the highest plain `X.Y.Z` tag is the current stable release. Cross-check against the latest GitHub release (tag form `vX.Y.Z`, dropped to `X.Y.Z` for Docker Hub):

  ```sh
  gh release view -R ArchiveBox/ArchiveBox --json tagName -q .tagName
  ```

## Applying the bump

- **`startos/manifest/index.ts`** — set `images.archivebox.source.dockerTag` to `archivebox/archivebox:<new version>` (no `v` prefix; matches the Docker Hub tag).
