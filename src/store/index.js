import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    strict: process.env.NODE_ENV !== 'production',
    mutations: {
        increment(state) {
            state.count++;
        }
    },
    actions: {
        increment(context) {
            context.commit('increment');
        }
    }
});

export default store;