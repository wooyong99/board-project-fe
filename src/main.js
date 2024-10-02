import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './style.css';
import { createPinia } from 'pinia';

createApp(App).use(router).use(createPinia()).mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
