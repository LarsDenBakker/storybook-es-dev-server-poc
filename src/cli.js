#!/usr/bin/env node
const { startServer, createConfig, readCommandLineArgs } = require('es-dev-server');
const serveHTML = require('./middlewares/serve-html');

const config = createConfig(readCommandLineArgs());
config.middlewares = [
  ...(config.middlewares || []),
  serveHTML,
];
startServer(config);
