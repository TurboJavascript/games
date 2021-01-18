import 'amfe-flexible';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './pixi-store'
Vue.config.productionTip = false;
const $vm = new Vue({
  store,
  devtools: true,
  render: h => h(App),
  el: '#app'
});
export {store, $vm}
