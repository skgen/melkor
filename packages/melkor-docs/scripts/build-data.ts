import path from 'node:path';
import melkorSchema from '@skgn/melkor/schema.json';
import { cyan, gray, green, red, yellow } from 'colorette';
import { differenceInMilliseconds } from 'date-fns';
import fse from 'fs-extra';

import { generateComponentPropsSchema } from './build-props-data';

const started = Date.now();

(async () => {
  const root = path.resolve(import.meta.filename, '../..');

  fse.rmSync(path.resolve(root, 'content/generated'), { recursive: true });
  fse.mkdirSync(path.resolve(root, 'content/generated/components'), { recursive: true });

  const states: number[] = [];
  for (const component of Object.keys(melkorSchema.components)) {
    states.push(generateComponentPropsSchema(component));
  }

  const success = states.filter(v => v === 0).length;
  const error = states.filter(v => v === 1).length;
  const skip = states.filter(v => v === 2).length;

  console.log(`\n${green(success)} generation.`);
  console.log(`${yellow(skip)} skip.`);
  console.log(`${red(error)} error.`);

  const elapsed = differenceInMilliseconds (Date.now(), started);
  console.log(`\n${gray(`Total time : ${cyan(elapsed)}ms`)}`);
})();
