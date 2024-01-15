export const namespaced = true

export const state = {
    selectedTerm: null,
    terms: []
}

export const actions = {
    updateSelectedTerm({ commit }, term) {
        commit('SET_SELECTED_TERM', term);
    },
    updateTerms({ commit }, terms) {
        commit('SET_TERMS', terms);
    },
    replaceTerm({ commit }, term) {
        commit('REPLACE_TERM', term);
    }
}

export const mutations = {
    SET_SELECTED_TERM(state, term) {
        state.selectedTerm = term;
    },
    SET_TERMS(state, terms) {
        state.terms = terms;
    },
    REPLACE_TERM(state, term) {
        state.terms.splice(state.terms.findIndex(item => item.id === term.id), 1, term);
    }
}