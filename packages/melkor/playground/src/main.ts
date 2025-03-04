// Modules
import { createMelkorUI } from '@skgn/melkor/plugin';

import { createApp } from 'vue';
import '@skgn/melkor/styles/index.css';

// App
import App from '@/App.vue';

const app = createApp(App);

const mkui = createMelkorUI();

app.use(mkui);

app.mount('#app');
