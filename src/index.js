import Vue from 'vue';
import App from './App.vue';
// import Element from 'element-ui';
// import Antd from 'ant-design-vue';
import api from './libs/api';
import router from './config/router';
import store from './store/store';
import Tools from './libs/Tools.js';
// import 'element-ui/lib/theme-chalk/index.css';
// import 'ant-design-vue/dist/antd.css';
// import '//at.alicdn.com/t/font_667160_k1loj6k2ef.css';
import '@/assets/css/reset.css';

// Vue.use(Element);
// Vue.use(Antd);

const tools = new Tools();

Vue.prototype.$api = api;
Vue.prototype.Tools = tools;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')