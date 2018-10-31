import Vue from 'vue';
import App from './App.vue';
import Element from 'element-ui';
import api from './libs/api';
import router from './libs/router';
import store from './store/index';
import Tools from './libs/Tools.js';

Vue.use(Element);

const tools = new Tools();

Vue.prototype.$api = api;
Vue.prototype.tools = tools;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')