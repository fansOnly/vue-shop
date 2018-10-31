import Vue from 'vue';
import Vuex from 'vuex';
// import title from './modules/title.js';
// import test from './modules/test.js';
import cart from './modules/cart.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        // test,
        // title,
        cart
    }
});

export default store;