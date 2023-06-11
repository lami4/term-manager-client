export const namespaced = true

export const state = {
    isSignedIn: false,
    userPrivileges: []
}

export const actions = {
    setIsSignedIn({commit}, value) {
        commit('SET_IS_SIGNED_IN', value);
    },
    setPrivileges({commit}, value) {
        commit('SET_PRIVILEGES', value);
    }
}

export const mutations = {
    SET_IS_SIGNED_IN(state, value) {
        state.isSignedIn = value;
    },
    SET_PRIVILEGES(state, value) {
        state.userPrivileges = value;
    }
}