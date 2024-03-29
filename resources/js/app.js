import './bootstrap';
import {createApp} from 'vue'
import router from './router/index'
import '../css/app.css';

import App from './App.vue'
import store from './store';

const app = createApp(App)
app.use(store)
app.use(router)
app.mount("#app")        