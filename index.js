#!/usr/bin/env node

const proxy = require('express-http-proxy');
const express = require('express');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

const port = parseInt(process.env.OIDC_PROXY_PORT); 
const app = express(); 

const oidc = new ExpressOIDC({
  issuer: process.env.OIDC_PROXY_ISSUER,
  client_id: process.env.OIDC_PROXY_CLIENT_ID,
  client_secret: process.env.OIDC_PROXY_CLIENT_SECRET,
  appBaseUrl: process.env.OIDC_PROXY_BASE_URL,
  scope: 'openid profile'
});
 
app.use(session({
  secret: process.env.OIDC_PROXY_SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use(oidc.router);

app.get('/oidc-proxy-health-check', function(req,res) {
  res.status(200).json({status:"ok"})
});
 
app.use('/', oidc.ensureAuthenticated(), proxy(process.env.OIDC_PROXY_ORIGIN));

oidc.on('ready', () => {
  app.listen(port, () => console.log(`oidc-proxy listening on port ${port}`));
});

if(process.env.OIDC_PROXY_INSECURE_PORT) {
  redirectApp = express();
  redirectApp.use('/', function(req,res) {
    res.redirect(301, process.env.OIDC_PROXY_BASE_URL + req.url)
  })
  const redirectPort = parseInt(process.env.OIDC_PROXY_INSECURE_PORT);
  redirectApp.listen(redirectPort, () => console.log(`oidc-proxy redirecting insecure traffic on port ${redirectPort}`));
}
