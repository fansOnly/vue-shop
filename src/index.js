/*jshint esversion: 6 */
import Vue from 'vue';
import App from './App.vue';
import request from './utils/request';
import router from './config/router';
import store from './store/store';
import Tools from './utils/Tools';
import Toast from './utils/toast';
// import '//at.alicdn.com/t/font_667160_k1loj6k2ef.css';
import '@/assets/css/reset.css';

window.Tools = new Tools();
window.Toast = new Toast();

Vue.prototype.$api = request;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');