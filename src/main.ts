//Vue library
import Vue from 'vue';
import App from './App.vue';

//Pinia has been chosen to create a store and share data accross the app
import { createPinia, PiniaVuePlugin } from 'pinia';

//CSS library bootstrap has been used for the design in particular for: user details card, the gender filter and the search result cards
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//CSS documents have been separated per components to improve clarity. However, only one document has been created to handle the responsiveneness: 'styleMedia'
import './assets/styleHome.css';
import './assets/styleResults.css';
import './assets/styleSearchBar.css';
import './assets/styleUserDetails.css';
import './assets/styleGenderFilter.css';
import './assets/styleMedia.css';

Vue.use(BootstrapVue);
Vue.use(PiniaVuePlugin);

new Vue({
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount('#app');
