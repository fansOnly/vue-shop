import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: resolve => require(['@/views/Home.vue'], resolve),
		meta: {
			title: '首页'
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: resolve => require(['@/views/login/Login.vue'], resolve),
		meta: {
			title: '登录'
		}
	},
	{
		path: '/test/:id',
		name: 'Test',
		component: resolve => require(['@/views/test.vue'], resolve),
		meta: {
			title: '测试'
		}
	},
	{
		path: '/search',
		name: 'SearchIndex',
		component: resolve => require(['@/views/search/index.vue'], resolve),
		meta: {
			title: '搜索'
		}
	},
	{
		path: '/category',
		name: 'Category',
		component: resolve => require(['@/views/category/index.vue'], resolve),
		meta: {
			title: '分类'
		}
	},
	{
		path: '/product/index/:category_id',
		name: 'ProductList',
		component: resolve => require(['@/views/product/index.vue'], resolve),
		meta: {
			title: '产品列表'
		}
	},
	{
		path: '/product/detail/:id',
		name: 'ProductDetail',
		component: resolve => require(['@/views/product/detail.vue'], resolve),
		meta: {
			title: '产品详情'
		}
	},
	{
		path: '/product/video/:id',
		name: 'ProductVideo',
		component: resolve => require(['@/views/product/video/index.vue'], resolve),
		meta: {
			title: '产品视频'
		}
	},
	{
		path: '/cart',
		name: 'Cart',
		component: resolve => require(['@/views/cart/index.vue'], resolve),
		meta: {
			title: '购物车'
		}
	},
	{
		path: '/user',
		name: 'User',
		component: resolve => require(['@/views/user/User.vue'], resolve),
		meta: {
			title: '我的',
			requireAuth: true
		}
	},
	{
		path: '/user/userInfo',
		name: 'UserInfo',
		component: resolve => require(['@/views/user/userInfo/index.vue'], resolve),
		meta: {
			title: '我的信息',
			requireAuth: true
		}
	},
	{
		path: '/user/coupon/:type',
		name: 'UserCoupon',
		component: resolve => require(['@/views/user/coupon/index.vue'], resolve),
		meta: {
			title: '我的优惠券',
			requireAuth: true
		}
	},
	{
		path: '/user/collection/:type',
		name: 'UserCollection',
		component: resolve => require(['@/views/user/collection/index.vue'], resolve),
		meta: {
			title: '我的收藏',
			requireAuth: true
		}
	},
	{
		path: '/user/score/record',
		name: 'ScoreRecord',
		component: resolve => require(['@/views/user/scoreRecord/index.vue'], resolve),
		meta: {
			title: '积分记录',
			requireAuth: true
		}
	},
	{
		path: '/user/address',
		name: 'Addressx',
		component: resolve => require(['@/views/user/address/index.vue'], resolve),
		meta: {
			title: '地址管理',
			requireAuth: true
		}
	},
	{
		path: '/user/address/edit/:id',
		name: 'EditAddress',
		component: resolve => require(['@/views/user/address/edit.vue'], resolve),
		meta: {
			title: '编辑地址',
			requireAuth: true
		}
	},
	{
		path: '/user/address/add',
		name: 'AddAddress',
		component: resolve => require(['@/views/user/address/add.vue'], resolve),
		meta: {
			title: '新增地址',
			requireAuth: true
		}
	},
	{
		path: '/user/address/select',
		name: 'SelectAddress',
		component: resolve => require(['@/views/user/address/select.vue'], resolve),
		meta: {
			title: '选择地址',
			requireAuth: true
		}
	},
	{
		path: '/user/order/:type',
		name: 'Order',
		component: resolve => require(['@/views/order/index.vue'], resolve),
		meta: {
			title: '我的订单',
			requireAuth: true
		}
	},
	{
		path: '/user/order/pay',
		name: 'OrderPay',
		component: resolve => require(['@/views/order/pay/index.vue'], resolve),
		meta: {
			title: '订单支付',
			requireAuth: true
		}
	},
	{
		path: '/user/order/detail/:id',
		name: 'OrderDetail',
		component: resolve => require(['@/views/order/detail.vue'], resolve),
		meta: {
			title: '订单详情',
			requireAuth: true
		}
	},
	{
		path: '/user/order/evaluation/:order_id',
		name: 'Evaluation',
		component: resolve => require(['@/views/order/evaluation/index.vue'], resolve),
		meta: {
			title: '订单评价详情',
			requireAuth: true
		}
	},
	{
		path: '/user/order/evaluate/:order_id',
		name: 'Evaluate',
		component: resolve => require(['@/views/order/evaluation/evaluate.vue'], resolve),
		meta: {
			title: '评价订单',
			requireAuth: true
		}
	},
	{
		path: '/user/order/dilivery/:order_id',
		name: 'Dilivery',
		component: resolve => require(['@/views/order/dilivery/index.vue'], resolve),
		meta: {
			title: '订单快递详情',
			requireAuth: true
		}
	},
	{
		path: '/user/order/return/:order_id',
		name: 'ReturnSubmit',
		component: resolve => require(['@/views/order/return/index.vue'], resolve),
		meta: {
			title: '申请退货',
			requireAuth: true
		}
	},
	{
		path: '/user/order/return/dilivery/:order_id',
		name: 'ReturnDilivery',
		component: resolve => require(['@/views/order/return/dilivery.vue'], resolve),
		meta: {
			title: '退货物流提交',
			requireAuth: true
		}
	},
	{
		path: '/user/order/return/detail/:order_id',
		name: 'ReturnDetail',
		component: resolve => require(['@/views/order/return/detail.vue'], resolve),
		meta: {
			title: '退货物流详情',
			requireAuth: true
		}
	},
	{
		path: '/coupon',
		name: 'Coupon',
		component: resolve => require(['@/views/coupon/index.vue'], resolve),
		meta: {
			title: '领取优惠券'
		}
	},
	{
		path: '/score',
		name: 'Score',
		component: resolve => require(['@/views/scoreMall/index.vue'], resolve),
		meta: {
			title: '积分商城'
		}
	},
	{
		path: '/score/detail/:id',
		name: 'ScoreDetail',
		component: resolve => require(['@/views/scoreMall/detail.vue'], resolve),
		meta: {
			title: '积分商城详情'
		}
	},
	{
		path: '/charge',
		name: 'Charge',
		component: resolve => require(['@/views/charge/index.vue'], resolve),
		meta: {
			title: '充值中心'
		}
	},
	{
		path: '/user/charge/record',
		name: 'ChargeRecord',
		component: resolve => require(['@/views/charge/record.vue'], resolve),
		meta: {
			title: '充值记录',
			requireAuth: true
		}
	},
	{
		path: '/user/feedback',
		name: 'Feedback',
		component: resolve => require(['@/views/user/feedback/index.vue'], resolve),
		meta: {
			title: '用户反馈',
			requireAuth: true
		}
	},
	{
		path: '/user/help',
		name: 'Help',
		component: resolve => require(['@/views/user/help/index.vue'], resolve),
		meta: {
			title: '帮助中心'
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
			if(to.matched.some(record=>record.meta.scrollTop)){
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