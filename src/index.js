import Vue from 'vue';
import App from './App.vue';
import Element from 'element-ui';
import api from './libs/api';
import router from './libs/router';

Vue.use(Element);
Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')