#!/usr/bin/env node
const { createConfig, startServer } = require('es-dev-server');
const readCommandLineArgs = require('./command-line-args');
const createServeStorybookMiddleware = require('./middlewares/serve-storybook');
const mdxToJSMiddleware = require('./middlewares/mdx-to-js');

const config = readCommandLineArgs();

config.esDevServerConfig.customMiddlewares = [
  createServeStorybookMiddleware({ storybookConfigDir: config.storybookServerConfig['storybook-config'] }),
  mdxToJSMiddleware,
  ...(config.customMiddlewares || []),
];

startServer(createConfig(config.esDevServerConfig));

['exit', 'SIGINT'].forEach(event => {
  // @ts-ignore
  process.on(event, () => {
    process.exit(0);
  });
});