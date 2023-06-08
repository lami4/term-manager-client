export const namespaced = true

export const state = {
    selectedUser: null,
    users: [],
    privileges: []
}

export const actions = {
    updateSelectedUser({ commit }, user) {
        commit('SET_SELECTED_USER', user);
    },
    updateUsers({ commit }, users) {
        commit('SET_USERS', users);
    },
    updatePrivileges({ commit }, privileges) {
        commit('SET_PRIVILEGES', privileges);
    }
}

export const mutations = {
    SET_SELECTED_USER(state, user) {
        state.selectedUser = user;
    },
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_PRIVILEGES(state, privileges) {
        state.privileges = privileges;
    }
}