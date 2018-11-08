import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: resolve => require(['@/views/Home.vue'], resolve),
		meta: {
			title: '首页'
		}
	},
	{
		path: '/login',
		name: 'login',
		component: resolve => require(['@/views/login/Login.vue'], resolve),
		meta: {
			title: '登录'
		}
	},
	{
		path: '/test/:id',
		name: 'test',
		component: resolve => require(['@/views/test.vue'], resolve),
		meta: {
			title: '测试'
		}
	},
	{
		path: '/searchIndex',
		name: 'searchIndex',
		component: resolve => require(['@/views/search/Index.vue'], resolve),
		meta: {
			title: '搜索'
		}
	},
	{
		path: '/category',
		name: 'category',
		component: resolve => require(['@/views/category/Category.vue'], resolve),
		meta: {
			title: '分类'
		}
	},
	{
		path: '/prolist/:categoryId',
		name: 'prolist',
		component: resolve => require(['@/views/product/ProList.vue'], resolve),
		meta: {
			title: '产品列表'
		}
	},
	{
		path: '/product/:id',
		name: 'product',
		component: resolve => require(['@/views/product/Product.vue'], resolve),
		meta: {
			title: '产品详情'
		}
	},
	{
		path: '/cart',
		name: 'cart',
		component: resolve => require(['@/views/cart/Cart.vue'], resolve),
		meta: {
			title: '购物车'
		}
	},
	{
		path: '/user',
		name: 'user',
		component: resolve => require(['@/views/user/User.vue'], resolve),
		meta: {
			title: '我的',
			requireAuth: true
		}
	},
	{
		path: '/user/userinfo/:userId',
		name: 'userinfo',
		component: resolve => require(['@/views/user/UserInfo.vue'], resolve),
		meta: {
			title: '我的信息'
		}
	},
	{
		path: '/address/:userId',
		name: 'address',
		component: resolve => require(['@/views/user/Address.vue'], resolve),
		meta: {
			title: '地址管理'
		}
	},
	{
		path: '/order/:type',
		name: 'order',
		component: resolve => require(['@/views/order/Index.vue'], resolve),
		meta: {
			title: '我的订单',
			requireAuth: true
		}
	},
];

const scrollBehavior = (to, from, savedPosition) => {
	if(savedPosition){
		return savedPosition;
	}else{
		const position = {};
		if(to.hash){
			position.selector = to.hash;
		}else{
			if(to.matched.some(im=>im.meta.scrollTop)){
				position.x = 0;
				position.y = 0;
			}
		}
		return position;
	}
};

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	scrollBehavior,
	routes
})

router.beforeEach((to, from, next)=>{
	// console.log("to", to);
	// console.log("from", from);
	if(to.matched.some(record => record.meta.requireAuth)){
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