#!/usr/bin/env node
const { createConfig, startServer } = require('es-dev-server');
const readCommandLineArgs = require('./command-line-args');
const createServeStorybookTransformer = require('./transformers/serve-storybook');
const mdxToJSTransformer = require('./transformers/mdx-to-js');

const config = readCommandLineArgs();

config.esDevServerConfig.responseTransformers = [
  mdxToJSTransformer,
  createServeStorybookTransformer({ storybookConfigDir: config.storybookServerConfig['storybook-config'] }),
  ...(config.esDevServerConfig.responseTransformers || []),
];

startServer(createConfig(config.esDevServerConfig));

['exit', 'SIGINT'].forEach(event => {
  // @ts-ignore
  process.on(event, () => {
    process.exit(0);
  });
});