// 状态树
const state = {
    carts: [],
    totals: null
};

// 派生状态，数据处理、筛选等
const getters = {
    cartProducts: (state, getters, rootState) => {
        return state.carts.map(({ id, goods_num }) => {
            const product = rootState.carts.all.find(product => product.id === id);
            return {
                title: product.title,
                price: product.price,
                goods_num
            }
        })
    },
    // 计算购物者价格
    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.goods_num;
        }, 0)
    }
};

// 更改state状态 commit，同步操作
const mutations = {
    // 修改购物者数量
    editCartNum: (state, { id, num }) => {
        const cartx = state.carts.find(item => item.id === id);
        cartx.goods_num = num;
    },
    // 修改购物者数量+1
    plusCartNum: (state, { id }) => {
        const cartx = state.carts.find(item => item.id === id);
        cartx.goods_num++;
    },
    // 修改购物者数量-1
    miusCartNum: (state, { id }) => {
        const cartx = state.carts.find(item => item.id === id);
        cartx.goods_num--;
    },
};

// 提交mutations， 异步操作
const actions = {
    editCartNum: (context, payload) => {
        context.commit('editCartNum', payload);
    },
    plusCartNum: (context, payload) => {
        context.commit('plusCartNum', payload);
    },
    miusCartNum: (context, payload) => {
        context.commit('miusCartNum', payload);
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