export const namespaced = true

export const state = {
    selectedSuggestion: null,
    suggestions: []
}

export const actions = {
    updateSelectedSuggestion({ commit }, suggestion) {
        commit('SET_SELECTED_SUGGESTION', suggestion);
    },
    updateSuggestions({ commit }, suggestions) {
        commit('SET_SUGGESTIONS', suggestions);
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