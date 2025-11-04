import './env';

import type { ShellString } from 'shelljs';
import type { PackageJson } from 'type-fest';

import path from 'node:path';
import process from 'node:process';

import { cyan, green, red } from 'colorette';
import Enquirer from 'enquirer';
import fs from 'fs-extra';
import sh from 'shelljs';

function handleError(options: { res: ShellString; message: string }) {
  const { res, message } = options;

  if (res.code !== 0) {
    console.error(message);
    console.error(res.stderr);
    console.error(res.stdout);
    process.exit(res.code);
  }
}

const e = new Enquirer();

const root = path.resolve(import.meta.filename, '../..');

const DRY_RUN = false;

const packages = {
  melkor: {
    path: 'packages/melkor',
  },
  kit: {
    path: 'packages/kit',
  },
  meta: {
    path: 'packages/meta',
  },
} as const;

const packagePrompt = await e.prompt([
  {
    name: 'package',
    type: 'select',
    message: 'What do you want to release ?',
    choices: [
      {
        name: 'melkor',
        message: 'Melkor',
      },
      {
        name: 'kit',
        message: 'Melkor - Kit',
      },
      {
        name: 'meta',
        message: 'Melkor - Meta',
      },
    ] satisfies ({
      name: keyof typeof packages;
      message: string;
    })[],
  },
]) as { package: keyof typeof packages };

const releasePackage = packages[packagePrompt.package];

const packageJson: PackageJson = JSON.parse(fs.readFileSync(path.resolve(root, releasePackage.path, 'package.json'), { encoding: 'utf-8' }));

let res: ShellString | null = null;

const exists = await fetch(`https://registry.npmjs.org/${packageJson.name}/${packageJson.version}`);

if (exists.status === 200) {
  console.error(red(`\nPackage ${cyan(`${packageJson.name}@${packageJson.version}`)} already exists at https://registry.npmjs.org`));
  process.exit(1);
}

console.log(`\nDeploying ${cyan(`${packageJson.name}@${packageJson.version}`)} ...`);

sh.exec(`bw logout`, { silent: true });
sh.exec(`bw config server ${process.env.BW_SERVER}`, { silent: true });
res = sh.exec(`bw login --apikey`, { silent: true });

handleError({
  res,
  message: red(`Failed to login`),
});

console.log(green('Logged in'));

res = sh.exec(`bw unlock --raw --passwordenv BW_PASSWORD`, { silent: true });

handleError({
  res,
  message: red(`Failed to unlock`),
});

const session = res.toString();

console.log(green('Unlocked'));

res = sh.exec(`bw get totp ${process.env.BW_ITEM_ID} --session ${session}`, { silent: true });

handleError({
  res,
  message: red(`Failed to read item`),
});

const totp = res.toString();

let tag: string | null = null;

if (packageJson.version?.includes('alpha')) {
  tag = 'alpha';
}
else if (packageJson.version?.includes('beta')) {
  tag = 'alpha';
}

const publishArgs = [
  DRY_RUN ? '--dry-run' : null,
  `--otp ${totp}`,
  tag ? `--tag ${tag}` : null,
].filter(v => v !== null);

res = sh.exec(`pnpm publish ${releasePackage.path} --access public ${publishArgs.join(' ')}`, { silent: false });

handleError({
  res,
  message: red(`Failed to publish ${cyan(`${packageJson.name}@${packageJson.version}`)}`),
});

console.log(green(`\nPackage ${cyan(`${packageJson.name}@${packageJson.version}`)} successfuly deployed !`));
