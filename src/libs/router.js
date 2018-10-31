import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [{
        path: '/',
        name: 'home',
        component: resolve => require(['@/views/Home.vue'], resolve),
        title: '首页'
    },
    {
        path: '/search',
        name: 'search',
        component: resolve => require(['@/views/Search.vue'], resolve),
        title: '搜索'
    },
    {
        path: '/category',
        name: 'category',
        component: resolve => require(['@/views/Category.vue'], resolve),
        title: '分类'
    },
    {
        path: '/cart',
        name: 'cart',
        component: resolve => require(['@/views/Cart.vue'], resolve),
        title: '购物车'
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;