import Vue from 'vue';
import Vuex from 'vuex';
// import title from './modules/title.js';
// import test from './modules/test.js';
import cart from './modules/cart.js';
import coupon from './modules/coupon.js';
import user from './modules/user.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        // test,
        // title,
        cart,
        coupon,
        user
    }
});

export default store;