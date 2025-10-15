import './assets/index.scss';

import type { MelkorPluginOptions } from '@skgn/melkor/vue-plugin';

import { createMelkor } from '@skgn/melkor/vue-plugin';
import { createApp } from 'vue';

import App from './app.vue';

const app = createApp(App);

app.use(createMelkor, <MelkorPluginOptions>{});

app.mount('#app');
