export const namespaced = true

export const state = {
    selectedTerm: null,
    selectedColumn: null,
    terms: [],
    columns: []
}

export const actions = {
    updateSelectedTerm({ commit }, term) {
        commit('SET_SELECTED_TERM', term);
    },
    updateSelectedColumn({ commit }, column) {
        commit('SET_SELECTED_COLUMN', column);
    },
    updateTerms({ commit }, terms) {
        commit('SET_TERMS', terms);
    },
    updateColumns({ commit }, columns) {
        commit('SET_COLUMNS', columns);
    },
    replaceTerm({ commit }, term) {
        commit('REPLACE_TERM', term);
    },
    replaceColumn({ commit }, column) {
        commit('REPLACE_COLUMN', column);
    }
}

export const mutations = {
    SET_SELECTED_TERM(state, term) {
        state.selectedTerm = term;
    },
    SET_SELECTED_COLUMN(state, column) {
        state.selectedColumn = column;
    },
    SET_TERMS(state, terms) {
        state.terms = terms;
    },
    SET_COLUMNS(state, columns) {
        state.columns = columns;
    },
    REPLACE_COLUMN(state, column) {
        state.columns.splice(state.columns.findIndex(item => item.id === column.id), 1, column);
    },
    REPLACE_TERM(state, term) {
        state.terms.splice(state.terms.findIndex(item => item.id === term.id), 1, term);
    }
}