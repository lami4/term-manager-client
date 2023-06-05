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
        return SuggestionManagerService.getSuggestions()
            .then(response => {
                commit('SET_SUGGESTIONS', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot fetch suggestions from the database!', 'getSuggestions', error, dispatch, true);
            })
    },
    addSuggestion({dispatch}, payload) {
        return SuggestionManagerService.addSuggestion(payload)
            .then(() => {
                showNotification('success', 'Suggestion was successfully added!', dispatch, true);
                dispatch('getSuggestions');
            })
            .catch(error => {
                handleError('error', 'Cannot add suggestion!', 'addSuggestion', error, dispatch, true);
            })
    },
    updateSuggestion({ commit, dispatch, state }, payload) {
        return SuggestionManagerService.updateSuggestion(payload)
            .then(() => {
                showNotification('success', 'Suggestion was successfully updated!', dispatch, true);
                dispatch('updateSelectedSuggestion', payload);
            })
            .catch(error => {
                handleError('error', 'Cannot update suggestion!', 'updateSuggestion', error, dispatch, true);
            })
    },
    deleteSuggestion({ commit, dispatch }, payload) {
        return SuggestionManagerService.deleteSuggestion(payload)
            .then(() => {
                showNotification('success', 'Suggestion was successfully deleted!', dispatch, true);
                dispatch('updateSelectedSuggestion', null);
                dispatch('getSuggestions');
            })
            .catch(error => {
                handleError('error', 'Cannot delete suggestion!', 'deleteSuggestion', error, dispatch, true);
            })
    },
    acceptSuggestion({ dispatch }, payload) {
        return SuggestionManagerService.acceptSuggestion(payload)
            .then(() => {
                showNotification('success', 'Suggestion was successfully accepted!', dispatch, true);
                dispatch('updateSelectedSuggestion', null);
                dispatch('getSuggestions');
            })
            .catch(error => {
                handleError('error', 'Cannot accept suggestion!', 'acceptSuggestion', error, dispatch, true);
            })
    }
}

export const mutations = {
    SET_SELECTED_SUGGESTION(state, suggestion) {
        state.selectedSuggestion = suggestion;
    },
    SET_SUGGESTIONS(state, suggestions) {
        state.suggestions = suggestions;
    }
}