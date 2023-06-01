import UserManagerService from "../../services/UserManagerService";
import {showNotification, handleError} from "../../helpers/GenericHelper.js"

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
    getUsers({ commit, dispatch }) {
        return UserManagerService.getUsers('/users')
            .then(response => {
                commit('SET_USERS', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot fetch users from the database!', 'getUsers', error, dispatch, true);
            })
    },
    addUser({ commit, dispatch }, payload) {
        return UserManagerService.addUser('users', payload)
            .then(() => {
                showNotification('success', 'User was successfully added!', dispatch, true);
                dispatch('getUsers');
            })
            .catch(error => {
                handleError('error', 'Cannot add user!', 'addUser', error, dispatch, true);
            })
    },
    updateUser({ commit, dispatch, state }, payload) {
        return UserManagerService.updateUser('users/' + payload.id, payload)
            .then(() => {
                state.selectedUser = payload;
                showNotification('success', 'User was successfully updated!', dispatch, true);
                dispatch('getUsers');
            })
            .catch(error => {
                handleError('error', 'Cannot update user!', 'updateUser', error, dispatch, true);
            })
    },
    deleteUser({ commit, dispatch }, payload) {
        return UserManagerService.deleteUser('users/' + payload.id)
            .then(() => {
                showNotification('success', 'User was successfully deleted!', dispatch, true);
                dispatch('getUsers');
            })
            .catch(error => {
                handleError('error', 'Cannot delete user!', 'deleteUser', error, dispatch, true);
            })
    },
    getPrivileges({ commit, dispatch }) {
        return UserManagerService.getPrivileges('/privileges')
            .then(response => {
                commit('SET_PRIVILEGES', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot fetch privileges from the database!', 'getPrivileges', error, dispatch, true);
            })
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