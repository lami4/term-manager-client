export const namespaced = true

export const state = {
    selectedColumn: null,
    columns: []
}

export const actions = {
    updateSelectedColumn({ commit }, column) {
        commit('SET_SELECTED_COLUMN', column);
    },
    updateColumns({ commit }, columns) {
        commit('SET_COLUMNS', columns);
    },
    replaceColumn({ commit }, column) {
        commit('REPLACE_COLUMN', column);
    }
}

export const mutations = {
    SET_SELECTED_COLUMN(state, column) {
        state.selectedColumn = column;
    },
    SET_COLUMNS(state, columns) {
        state.columns = columns;
    },
    REPLACE_COLUMN(state, column) {
        state.columns.splice(state.columns.findIndex(item => item.id === column.id), 1, column);
    }
}