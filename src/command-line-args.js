const commandLineArgs = require('command-line-args');
const { readCommandLineArgs: esDevServerCommandLineArgs } = require('es-dev-server');

module.exports = function readCommandLineArgs() {
  const optionDefinitions = [
    {
      name: 'storybook-config',
      alias: 's',
      type: String,
      defaultValue: './.storybook',
      description: 'Location of storybook configuration',
    },
  ];

  const storybookServerConfig = commandLineArgs(optionDefinitions, { partial: true });
  const esDevServerConfig = esDevServerCommandLineArgs(storybookServerConfig._unknown || []);

  return { storybookServerConfig, esDevServerConfig };
}
