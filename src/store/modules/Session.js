export const namespaced = true

export const state = {
    isSignedIn: false,
    userPrivileges: [],
    userEmail: null,
    userId: null,
    showSignInDialog: false
}

export const actions = {
    setIsSignedIn({commit}, value) {
        commit('SET_IS_SIGNED_IN', value);
    },
    setPrivileges({commit}, value) {
        commit('SET_PRIVILEGES', value);
    },
    setShowSignInDialog({commit}, value) {
        commit('SET_SHOW_SIGN_IN_DIALOG', value);
    },
    setUserEmail({commit}, value) {
        commit('SET_USER_EMAIL', value);
    },
    setUserId({commit}, value) {
        commit('SET_USER_ID', value);
    }
}

export const mutations = {
    SET_IS_SIGNED_IN(state, value) {
        state.isSignedIn = value;
    },
    SET_PRIVILEGES(state, value) {
        state.userPrivileges = value;
    },
    SET_SHOW_SIGN_IN_DIALOG(state, value) {
        state.showSignInDialog = value;
    },
    SET_USER_EMAIL(state, value) {
        state.userEmail = value;
    },
    SET_USER_ID(state, value) {
        state.userId = value;
    }
}