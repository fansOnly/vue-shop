import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
	{ path: '/', name: 'home', component: resolve=> require(['@/views/Home.vue'], resolve) },
	{ path: '/search', name: 'search', component: resolve=> require(['@/views/Search.vue'], resolve) },
	{ path: '/category', name: 'category', component: resolve=> require(['@/views/Category.vue'], resolve) },
];

const router = new VueRouter({
	mode: 'history',
	routes
})


export default router;