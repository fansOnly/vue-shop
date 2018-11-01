import GetBestCouponByCart from "@/libs/coupon.js";

// 状态树
const state = {
	checkedCarts: [],
	carts: [],
	total: null,
	couponsList: [],
	bestCoupon: null
};

// 派生状态，数据处理、筛选等
const getters = {
	checkedProducts: (state) => {
		return state.checkedCarts.length ? state.checkedCarts.map((id) => {
			const product = state.carts.find(product => product.id === id);
			return {
				id: id,
				category_id: product.category_id,
				price: Number(product.mprice) > 0 ? Number(product.mprice) : Number(product.price),
				quantity: product.goods_num
			}
		}) : [];
	},
	// 计算购物车价格
	cartTotalPrice: (state, getters) => {
		return getters.checkedProducts.reduce((total, product) => {
			return total + product.price * product.quantity;
		}, 0);
	},
	// 计算最佳优惠方案
	getBestCoupon: (state, getters) => {
		return GetBestCouponByCart(getters.checkedProducts, state.couponsList);
	}
};

// 更改state状态 commit，同步操作
const mutations = {
	setCarts: (state, {
		carts,
		checkedCarts
	}) => {
		state.carts = carts;
		state.checkedCarts = checkedCarts;
	},
	// 修改购物者数量
	editQuantity: (state, {
		id,
		num
	}) => {
		const cartx = state.carts.find(item => item.id === id);
		cartx.goods_num = num;
	},
	// 修改购物者数量+1
	incrementQuantity: (state, {
		id
	}) => {
		const cartx = state.carts.find(item => item.id === id);
		cartx.goods_num++;
	},
	// 修改购物者数量-1
	decrementQuantity: (state, {
		id
	}) => {
		const cartx = state.carts.find(item => item.id === id);
		cartx.goods_num--;
	},
	setCouponsList: (state, {
		couponsList
	}) => {
		state.couponsList = couponsList;
	},
};

// 提交mutations， 异步操作
const actions = {
	setCarts: (context, payload) => {
		context.commit('setCarts', payload);
	},
	editQuantity: (context, payload) => {
		context.commit('editQuantity', payload);
	},
	incrementQuantity: (context, payload) => {
		context.commit('incrementQuantity', payload);
	},
	decrementQuantity: (context, payload) => {
		context.commit('decrementQuantity', payload);
	},
	setCouponsList: (context, payload) => {
		context.commit('setCouponsList', payload);
	}
};

export default {
	// 命名空间
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}