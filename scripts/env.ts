import process from 'node:process';

import dotenvFlow from 'dotenv-flow';
import dotenvParseVariables from 'dotenv-parse-variables';

const env = dotenvFlow.config();

if (!env) {
  throw new Error('Problem occured loading env');
}
if (env.error) {
  throw env.error;
}

const typed = dotenvParseVariables(env.parsed ?? {}) as NodeJS.ProcessEnv;

for (const [key, value] of Object.entries(typed)) {
  process.env[key] = value;
}
