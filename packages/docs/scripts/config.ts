import process from 'node:process';

import { Command } from 'commander';

const program = new Command()
  .option('-c <component>', 'Component name for single build');

program.parse(process.argv);

export const config = {
  program,
  debug: true,
  propsName: 'Props',
};
