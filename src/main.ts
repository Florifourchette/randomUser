import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import SuiVue from 'semantic-ui-vue';
import './assets/styleHome.css';
import './assets/styleResults.css';
import './assets/styleSearchBar.css';
import './assets/styleUserDetails.css';
import './assets/styleGenderFilter.css';
import './assets/styleMedia.css';

import App from './App.vue';

Vue.use(SuiVue);
Vue.use(PiniaVuePlugin);

new Vue({
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
