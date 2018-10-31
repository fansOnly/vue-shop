

const state = {
	pageTitle: null
};

const getters = {};

const mutations = {
	setPageTitle: (state, pageTitle) => {
		state.pageTitle = pageTitle;
	}
};

const actions = {
	setPageTitle: ({commit}, payload) => {
		commit('setPageTitle', payload.pageTitle);
	}
};


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}