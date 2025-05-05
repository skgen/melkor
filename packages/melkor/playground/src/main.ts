// Modules
import { createMelkorUI } from '@skgn/melkor/plugin';
import { createApp } from 'vue';

// App
import App from '@/App.vue';

import '@skgn/melkor/styles/index.css';

const app = createApp(App);

const mkui = createMelkorUI();

app.use(mkui);

app.mount('#app');
