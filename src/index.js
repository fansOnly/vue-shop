import Vue from 'vue';
import App from './App.vue';
import Element from 'element-ui';
import api from './libs/api';
import router from './libs/router';
import store from './store/index';


Vue.use(Element);

Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')