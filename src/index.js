import Vue from 'vue';
import App from './App.vue';
import Element from 'element-ui';
import api from './libs/api';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element);
Vue.prototype.$api = api;


Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app')