import './env';

import type { ShellString } from 'shelljs';

import path from 'node:path';
import process from 'node:process';

import { cyan, green, red } from 'colorette';
import * as enquirer from 'enquirer';
import sh from 'shelljs';

const Enquirer = enquirer.default;
const e = new Enquirer();

const root = path.resolve(import.meta.filename, '../..');

const packages = {
  'melkor': {
    path: 'packages/melkor',
  },
  'melkor-nuxt': {
    path: 'packages/nuxt',
  },
} as const;

const packagePrompt = await e.prompt([
  {
    name: 'package',
    type: 'select',
    message: 'What do you want to release ?',
    choices: [{
      name: 'melkor',
      value: 'melkor',
      message: 'Melkor',
    }, {
      name: 'melkor-nuxt',
      value: 'melkor-nuxt',
      message: 'Melkor Nuxt',
    }] satisfies ({
      name: keyof typeof packages;
      value: keyof typeof packages;
      message: string;
    })[],
  },
]) as { package: keyof typeof packages };

const releasePackage = packages[packagePrompt.package];

const packageJson = await import(path.resolve(path.resolve(root, releasePackage.path), 'package.json'));

const exists = await fetch(`https://registry.npmjs.org/${packageJson.name}/${packageJson.version}`);

if (exists.status === 200) {
  console.error(red(`\nPackage ${cyan(`${packageJson.name}@${packageJson.version}`)} already exists at https://registry.npmjs.org`));
  process.exit(1);
}

let res: ShellString | null = null;

console.log(`\nDeploying ${cyan(`${packageJson.name}@${packageJson.version}`)} ...`);

sh.exec(`bw logout`, { silent: true });
sh.exec(`bw config server ${process.env.BW_SERVER}`, { silent: true });
res = sh.exec(`bw login --apikey`, { silent: true });

if (res.code === 1) {
  console.error(red(`Login failed`));
  console.error(res.stderr);
  console.error(res.stdout);
  process.exit(1);
}

console.log(green('Logged in'));

res = sh.exec(`bw unlock --raw --passwordenv BW_PASSWORD`, { silent: true });

if (res.code === 1) {
  console.error(red(`Unlock failed`));
  console.error(res.stderr);
  console.error(res.stdout);
  process.exit(1);
}

const session = res.toString();

console.log(green('Unlocked'));

res = sh.exec(`bw get totp ${process.env.BW_ITEM_ID} --session ${session}`, { silent: true });

if (res.code === 1) {
  console.error(red(`Failed to read item`));
  console.error(res.stderr);
  console.error(res.stdout);
  process.exit(1);
}

const totp = res.toString();

const publishArgs = [
  // '--dry-run',
  `--otp ${totp}`,
];

res = sh.exec(`pnpm publish ${releasePackage.path} --access public ${publishArgs.join(' ')}`, { silent: true });

if (res.code === 1) {
  console.error(red(`Failed to publish ${cyan(`${packageJson.name}@${packageJson.version}`)}`));
  console.error(res.stderr);
  console.error(res.stdout);
  process.exit(1);
}

console.log(green(`\nPackage ${cyan(`${packageJson.name}@${packageJson.version}`)} successfuly deployed !`));
