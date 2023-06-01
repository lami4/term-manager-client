export const namespaced = true

export const state = {
    isSignedIn: false,
    canManageUser: false,
    canManageTerms: false,
    canManageTermGrid: false
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
        state.canManageUser = value.some(privilege => privilege === 1);
        state.canManageTerms = value.some(privilege => privilege === 2);
        state.canManageTermGrid = value.some(privilege => privilege === 3);
    }
}