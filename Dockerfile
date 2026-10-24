ARG IMAGE
FROM ${IMAGE}
# The base image's CA store is only as current as its last release; certifi and Node carry their own copies.
RUN apt-get update && apt-get install -y --no-install-recommends --only-upgrade ca-certificates && rm -rf /var/lib/apt/lists/* \
 && ! grep -q MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr /etc/ssl/certs/ca-certificates.crt \
 && find /venv /opt/archivebox/lib/uv -path '*/certifi/cacert.pem' -exec sh -ec \
      'for bundle do cp /etc/ssl/certs/ca-certificates.crt "$bundle"; done' sh {} + \
 && ! find /venv /opt/archivebox/lib/uv -path '*/certifi/cacert.pem' -exec grep -l MIICTjCCAdOgAwIBAgIKPPYHqWhwDtqLhDAKBggqhkjOPQQDAzBr {} + | grep -q .
ENV NODE_OPTIONS=--use-openssl-ca
COPY --from=node:24.22.1-trixie-slim /usr/local/bin/node /opt/node/bin/node
RUN [ "$(node --version)" = v24.22.1 ]
