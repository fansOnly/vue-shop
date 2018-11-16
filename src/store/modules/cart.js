import GetBestCouponByCart from "@/utils/coupon.js";
import cart from '@/api/cart';

// 状态树
const state = {
    checkedCarts: [],
    carts: [],
    checkAll: false,
    checkedNum: 0,
    total: null,
    couponsList: [],
    bestCoupon: null
};

// 派生状态，数据处理、筛选等
const getters = {
    checkedProducts: (state) => {
        return state.checkedCarts.length ? state.checkedCarts.map((id) => {
            const product = state.carts.find(product => product.id === Number(id));
            return {
                id: Number(id),
                category_id: product.category_id,
                price: Number(product.mprice) > 0 ? Number(product.mprice) : Number(product.price),
                quantity: product.goods_num
            }
        }) : [];
    },
    // 是否全选
    checkAll: (state) => {
        return state.carts.length > 0 && state.carts.length === state.checkedCarts.length
    },
    // 购物车数量
    checkedNum: (state) => {
        return state.checkedCarts.length
    },
    // 计算购物车价格
    cartTotalPrice: (state, getters) => {
        return getters.checkedProducts.reduce((total, product) => {
            return total + product.price * product.quantity;
        }, 0);
    },
    // 计算最佳优惠方案
    getBestCoupon: (state, getters) => {
        const bestCoupon = GetBestCouponByCart(getters.checkedProducts, state.couponsList);
        if(!Tools.isEmptyObject(bestCoupon)){
            localStorage.setItem('bestCoupon', bestCoupon);
        }else{
            localStorage.setItem('bestCoupon', null);
        }
        return bestCoupon;
    },
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
        // payload.user_id = 1;
        // payload.id = payload.checkedCarts.join(',');
        // payload.isAll = payload.checkedCarts.length === payload.carts.length ? 1 : 0;
        // cart.OperateUserCart(payload,
        //     () => context.commit('setCarts', payload),
        //     (err) => console.log('err', err)
        // );
    },
    editQuantity: (context, payload) => {
        payload.user_id = 1;
        cart.IncrementNum(payload,
            () => context.commit('editQuantity', payload),
            (err) => console.log('err', err)
        );
    },
    incrementQuantity: (context, payload) => {
        payload.user_id = 1;
        cart.IncrementNum(payload,
            () => context.commit('incrementQuantity', payload),
            (err) => console.log('err', err)
        );
    },
    decrementQuantity: (context, payload) => {
        payload.user_id = 1;
        cart.DecrementNum(payload,
            () => context.commit('decrementQuantity', payload),
            (err) => console.log('err', err)
        );
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