const state = {
    okCoupon: {}
};

const getters = {
    // Getcoupon: (state) => {
    //     return localStorage.getItem("coupon") ? localStorage.getItem("coupon") : {};
    // },
    // GetcouponId: (state) => {
    //     return state.coupon.id ? state.coupon.id : 0;
    // }
};

const mutations = {
    setCoupon: (state, { coupon }) => {
        state.okCoupon = coupon;
    },
};

const actions = {
    setCoupon: (context, payload) => {
        context.commit('setCoupon', payload);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}