import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import SuiVue from 'semantic-ui-vue';
import './assets/stylesheet.css';

import App from './App.vue';

Vue.use(SuiVue);
Vue.use(PiniaVuePlugin);

new Vue({
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
