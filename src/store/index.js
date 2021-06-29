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
        state.selectedColumn = state.columns.find((obj) => obj.html_id == columnHtmlId);
        state.selectedTerm = null;
      }
    },
    SET_TERMS(state, terms) {
      state.terms = terms;
    },
    SET_COLUMNS(state, columns) {
      state.columns = columns;
    },
    SET_COLUMN_NAME(state, columnName) {
      state.selectedColumn.column_name = columnName;
    }
  },
  actions: {
    updateSelectedTerm({ commit }, termId) {
      commit('SET_SELECTED_TERM', termId);
    },
    updateSelectedColumn({ commit }, columnHtmlId) {
      commit('SET_SELECTED_COLUMN', columnHtmlId);
    },
    addTerm({dispatch}, userInput) {
      return TermGridService.addTerm(userInput)
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
    updateTerm({dispatch} , userInput) {
      return TermGridService.updateTerm(userInput)
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
    },
    deleteTerm({state, dispatch}) {
      return TermGridService.deleteTerm(state.selectedTerm.id)
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
    addColumn({dispatch}, columnName) {
      return TermGridService.addColumn(columnName)
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
        console.log("Error performing 'addColumn' action: " + error.message)  
      })
    }
  }
})
