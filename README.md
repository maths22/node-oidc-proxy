# Setup

To configure the proxy, simply set the following environment variables:

* OIDC_PROXY_BASE_URL: host for the oauth flow to redirect back to
* OIDC_PROXY_PORT: the port the proxy should listen on
* OIDC_PROXY_ORIGIN: origin to proxy
* OIDC_PROXY_INSECURE_PORT: (optional) port to redirect to https

* OIDC_PROXY_ISSUER: issuer from the IdP
* OIDC_PROXY_CLIENT_ID: client ID provided by IdP
* OIDC_PROXY_CLIENT_SECRET: client secret provided by IdP

* OIDC_PROXY_SESSION_SECRET: random secret for protecting the session cookie
