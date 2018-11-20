const state = {
    user: {}
};

const getters = {
    GetUser: (state) => {
        if (Tools.isEmptyObject(state.user)) {
            if(localStorage.getItem('user')) {
                state.user = JSON.parse(localStorage.getItem('user'));
            }
        }
        return state.user;
    }
};

const mutations = {
    SetUser: (state, {user}) => {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        // localStorage.setItem('user', user);
    }
};

const actions = {
    SetUser: (context, payload) => {
        context.commit('SetUser', payload);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}