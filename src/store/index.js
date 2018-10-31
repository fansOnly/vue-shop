import Vue from 'vue';
import Vuex from 'vuex';
import title from './modules/title.js';
import cart from './modules/cart.js';

Vue.use(Vuex);

const store = new Vuex.Store({
	// state: {
	// 	pageTitle: ''
	// },
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		title,
		cart
	}
});

export default store;