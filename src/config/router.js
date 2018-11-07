import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: resolve => require(['@/views/Home.vue'], resolve),
		title: '首页'
	},
	{
		path: '/test',
		name: 'test',
		component: resolve => require(['@/views/test.vue'], resolve),
		title: '测试'
	},
	{
		path: '/searchIndex',
		name: 'searchIndex',
		component: resolve => require(['@/views/search/SearchIndex.vue'], resolve),
		title: '搜索'
	},
	{
		path: '/category',
		name: 'category',
		component: resolve => require(['@/views/category/Category.vue'], resolve),
		title: '分类'
	},
	{
		path: '/prolist/:categoryId',
		name: 'prolist',
		component: resolve => require(['@/views/product/ProList.vue'], resolve),
		title: '产品列表'
	},
	{
		path: '/product/:id',
		name: 'product',
		component: resolve => require(['@/views/product/Product.vue'], resolve),
		title: '产品详情'
	},
	{
		path: '/cart',
		name: 'cart',
		component: resolve => require(['@/views/cart/Cart.vue'], resolve),
		title: '购物车',
	},
	{
		path: '/user',
		name: 'user',
		component: resolve => require(['@/views/user/User.vue'], resolve),
		title: '我的',
		meta: {
			requireAuth: true
		}
	},
];

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes
})

router.beforeEach((to, from, next)=>{
	if(to.meta.requireAuth){
		if(localStorage.getItem("token")){
			next();
		}else{
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			});
		}
	}else{
		next();
	}
})

export default router;