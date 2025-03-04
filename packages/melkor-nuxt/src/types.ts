import type { Resolver } from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { DeepObjectPartial } from '@skgn/melkor';
import type { MelkorOptions } from '@skgn/melkor/features';

export interface ModuleOptions {
  debug: false;
}

export interface MelkorNuxtContext<TSchema extends Record<string, any> = Record<string, any>> {
  resolver: Resolver;
  logger: ReturnType<typeof import('@nuxt/kit')['useLogger']>;
  moduleOptions: ModuleOptions;
  melkorOptions: DeepObjectPartial<MelkorOptions>;
  schema: TSchema;
  nuxt: Nuxt;
  runtimeDir: string;
}

export interface MelkorModuleOptions {
  moduleOptions?: DeepObjectPartial<ModuleOptions>;
  melkorOptions?: DeepObjectPartial<MelkorOptions>;
}
