import SuggestionManagerService from "../../services/SuggestionManagerService";
import {showNotification, handleError} from "../../helpers/GenericHelper.js"

export const namespaced = true

export const state = {
    selectedSuggestion: null,
    suggestions: []
}

export const actions = {
    updateSelectedSuggestion({ commit }, suggestion) {
        commit('SET_SELECTED_SUGGESTION', suggestion);
    },
    getSuggestions({ commit, dispatch }) {
        return SuggestionManagerService.getSuggestions('/suggestions')
            .then(response => {
                commit('SET_SUGGESTIONS', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot fetch suggestions from the database!', 'getSuggestions', error, dispatch, true);
            })
    },
    addSuggestion({dispatch}, payload) {
        return SuggestionManagerService.addSuggestion('/suggestions', payload)
            .then(() => {
                showNotification('success', 'Suggestion was successfully added!', dispatch, true);
            })
            .catch(error => {
                handleError('error', 'Cannot add suggestion!', 'addSuggestion', error, dispatch, true);
            })
    },
    updateSuggestion({ commit, dispatch, state }, payload) {
        // return UserManagerService.updateUser('users/' + payload.id, payload)
        //     .then(() => {
        //         state.selectedUser = payload;
        //         showNotification('success', 'User was successfully updated!', dispatch, true);
        //         dispatch('getUsers');
        //     })
        //     .catch(error => {
        //         handleError('error', 'Cannot update user!', 'updateUser', error, dispatch, true);
        //     })
    },
    // deleteUser({ commit, dispatch }, payload) {
    //     return UserManagerService.deleteUser('users/' + payload.id)
    //         .then(() => {
    //             showNotification('success', 'User was successfully deleted!', dispatch, true);
    //             dispatch('getUsers');
    //         })
    //         .catch(error => {
    //             handleError('error', 'Cannot delete user!', 'deleteUser', error, dispatch, true);
    //         })
    // }
}

export const mutations = {
    SET_SELECTED_SUGGESTION(state, suggestion) {
        state.selectedSuggestion = suggestion;
    },
    SET_SUGGESTIONS(state, suggestions) {
        state.suggestions = suggestions;
    }
}