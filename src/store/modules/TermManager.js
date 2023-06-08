import {showNotification, handleError} from "../../helpers/GenericHelper.js"
import TermGridService from "../../services/TermGridService";

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
    getColumns({ commit, dispatch }) {
        return TermGridService.getColumns()
            .then(response => {
                response.data.sort((a, b) => a.position - b.position);
                response.data.forEach(column => {
                    column.dropdownOptions.sort((a, b) => a.position - b.position);
                });
                commit('SET_COLUMNS', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot fetch columns from the database!', 'getColumns', error, dispatch, true);
            })
    },
    addColumn({dispatch}, payload) {
        return TermGridService.addColumn(payload)
            .then(() => {
                dispatch('getColumns');
                dispatch('getTerms');
            })
            .catch(error => {
                handleError('error', 'Cannot add column!', 'addColumn', error, dispatch, true);
            })
    },
    updateColumn({state, dispatch, commit}, payload) {
        return TermGridService.updateColumn(payload)
            .then(() => {
                showNotification('success', 'Column was successfully updated!', dispatch, true);
                commit('UPDATE_COLUMN', payload);
                dispatch('getTerms');
            })
            .catch(error => {
                handleError('error', 'Cannot update column!', 'updateColumn', error, dispatch, true);
            })
    },
    deleteColumn({state, dispatch, commit}, payload) {
        return TermGridService.deleteColumn(payload)
            .then(() => {
                showNotification('success', 'Column was successfully deleted!', dispatch, true);
                // commit('REMOVE_PROPERTY_FROM_TERMS', state.selectedColumn);
                commit('DELETE_COLUMN', state.selectedColumn);
                dispatch('getTerms');
            })
            .catch(error => {
                handleError('error', 'Cannot delete column!', 'deleteColumn', error, dispatch, true);
            })
    },
    reorderColumns({state, dispatch, commit}, payload) {
        return TermGridService.reorderColumns(payload)
            .then(() => {
                dispatch('getColumns');
            })
            .then(() => {
                showNotification('success', 'Columns were successfully reordered!', dispatch, true);
            })
            .catch(error => {
                handleError('error', 'Cannot reorder columns!', 'reorderColumns', error, dispatch, true);
            })
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
    UPDATE_COLUMN(state, column) {
        state.columns.splice(state.columns.findIndex(item => item.id === column.id), 1, column);
        state.selectedColumn = column;
    },
    DELETE_COLUMN(state, column) {
        state.columns.splice(state.columns.findIndex(item => item.id === column.id), 1);
        state.selectedColumn = null;
    }
}