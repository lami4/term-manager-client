import Vue from 'vue'
import Vuex from 'vuex'
import TermGridService from "../services/TermGridService.js";
import * as notificator from "./modules/notification.js";
export const namespaced = true

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notificator
  },
  state: {
    selectedTerm: null,
    selectedColumn: null,
    terms: [],
    columns: []
  },
  mutations: {
    SET_SELECTED_TERM(state, termId) {
      if (!termId && !state.selectedTerm) {
        state.selectedTerm = null;
      } else {
        state.selectedTerm = state.terms.find((obj) => obj.id == termId);
        state.selectedColumn = null;
      }
    },
    SET_SELECTED_COLUMN(state, columnHtmlId) {
      if (!columnHtmlId && !state.selectedColumn) {
        state.selectedColumn = null;
      } else {
        state.selectedColumn = state.columns.find((obj) => obj.htmlId == columnHtmlId);
        state.selectedTerm = null;
      }
    },
    SET_TERMS(state, terms) {
      state.terms = terms;
    },
    SET_COLUMNS(state, columns) {
      state.columns = columns;
    },
    SET_SELECTED_COLUMN_NAME(state, columnName) {
      state.selectedColumn.columnName = columnName;
    }
  },
  actions: {
    updateSelectedTerm({ commit }, termId) {
      commit('SET_SELECTED_TERM', termId);
    },
    updateSelectedColumn({ commit }, columnHtmlId) {
      commit('SET_SELECTED_COLUMN', columnHtmlId);
    },
    getTerms({ commit, dispatch }) {
      return TermGridService.getTerms()
      .then(response => {
        commit('SET_TERMS', response.data);
      })
      .catch(error => {
        console.log("Error performing 'getTerms' action: " + error.message);
        let notification = {
          type: 'error',
          message: "Cannot fetch terms from the database!"
        }
        dispatch('notificator/add', notification)
      })
    },
    addTerm({dispatch}, userInput) {
      return TermGridService.addTerm('terms', {"termProperties": userInput})
      .then(() => {
        let notification = {
          type: 'success',
          message: "Term was successfully added!"
        }
        dispatch('notificator/add', notification)
      })
      .then(() => {
        dispatch("getTerms")
      })
      .catch(error => {
        let notification = {
          type: 'error',
          message: "Cannot add term!"
        }
        dispatch('notificator/add', notification)
      })
    },
    updateTerm({dispatch, state}, userInput) {
      return TermGridService.updateTerm(`/terms/${state.selectedTerm.id}`, {"termProperties": userInput})
      .then(() => {
        let notification = {
          type: 'success',
          message: "Term was successfully updated!"
        }
        dispatch('notificator/add', notification)
      })
      .then(() => {
        dispatch('getTerms');
      })
      .catch(error => {
        let notification = {
          type: 'error',
          message: "Cannot update term!"
        }
        dispatch('notificator/add', notification)
        console.log("Error performing 'updateTerm' action: " + error.message)
      })
    },
    deleteTerm({state, dispatch}) {
      return TermGridService.deleteTerm(`terms/${state.selectedTerm.id}`)
      .then(() => {
        state.selectedTerm = null;
        let notification = {
          type: 'success',
          message: "Term was successfully deleted!"
        }
        dispatch('notificator/add', notification)
      })
      .then(() => {
        dispatch("getTerms")
      })
      .catch(error => {
        let notification = {
          type: 'error',
          message: "Cannot delete term!"
        }
        dispatch('notificator/add', notification)
        console.log("Error performing 'deleteTerm' action: " + error.message)
      })
    },
    getColumns({ commit, dispatch }) {
      return TermGridService.getColumns()
      .then(response => {
        commit('SET_COLUMNS', response.data);
      })
      .catch(error => {
        console.log("Error performing 'getColumns' action: " + error.message);
        let notification = {
          type: 'error',
          message: "Cannot fetch columns from the database!"
        }
        dispatch('notificator/add', notification)
      })
    },
    addColumn({dispatch}, userInput) {
      return TermGridService.addColumn({"columnName": userInput["column-name"]})
      .then(() => {
        let notification = {
          type: 'success',
          message: "Column was successfully added!"
        }
        dispatch('notificator/add', notification)
      })
      .then(() => {
        dispatch('getColumns');
        dispatch('getTerms');
      })
      .catch(error => {
        let notification = {
          type: 'error',
          message: "Cannot add column!"
        }
        dispatch('notificator/add', notification)
      })
    },
    updateColumn({state, dispatch, commit}, userInput) {
      return TermGridService.updateColumn(`/columns/${state.selectedColumn.id}`, {"columnName" : userInput["column-name"]})
      .then(() => {
        commit('SET_SELECTED_COLUMN_NAME', userInput["column-name"])
      })
      .then(() => {
        let notification = {
          type: 'success',
          message: "Column was successfully updated!"
        }
        dispatch('notificator/add', notification)
      })
      .catch(error => {
        let notification = {
          type: 'error',
          message: "Cannot update column!"
        }
        dispatch('notificator/add', notification)
        console.log("Error performing 'updateColumn' action: " + error.message)
      })
    },
    deleteColumn({state, dispatch}) {
      return TermGridService.deleteColumn(state.selectedColumn)
      .then(() => {
        state.selectedColumn = null;
        let notification = {
          type: 'success',
          message: "Column was successfully deleted!"
        }
        dispatch('notificator/add', notification)
      })
      .then(() => {
        dispatch("getTerms")
        dispatch("getColumns")
      })
      .catch(error => {
        let notification = {
          type: 'error',
          message: "Cannot delete column!"
        }
        dispatch('notificator/add', notification)
        console.log("Error performing 'deleteColumn' action: " + error.message)
      })
    }
  }
})
