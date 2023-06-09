import httpClient from "./HttpClient";
import {handleError, showNotification} from "../helpers/GenericHelper";
import store from '../store/index';

export default {
    getTerms() {
        return httpClient.get('/terms')
            .then(response => {
                store.dispatch('TermManager/updateTerms', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot fetch terms from the database!', 'getTerms', error, store.dispatch, true);
            });
    },
    addTerm(payload) {
        return httpClient.post('/terms', payload)
            .then(() => {
                showNotification('success', 'Term was successfully added!', store.dispatch, true);
                this.getTerms();
            })
            .catch(error => {
                handleError('error', 'Cannot add term!', 'addTerm', error, store.dispatch, true);
            });
    },
    updateTerm(payload) {
        return httpClient.put('/terms/' + payload.id, payload)
            .then(response => {
                showNotification('success', 'Term was successfully updated!', store.dispatch, true);
                store.dispatch('TermManager/updateSelectedTerm', response.data);
                store.dispatch('TermManager/replaceTerm', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot update term!', 'updateTerm', error, store.dispatch, true);
            });
    },
    deleteTerm(payload) {
        return httpClient.delete('/terms/' + payload.id)
            .then(() => {
                showNotification('success', 'Term was successfully deleted!', store.dispatch, true);
                store.dispatch('TermManager/updateSelectedTerm', null);
                this.getTerms();
            })
            .catch(error => {
                handleError('error', 'Cannot delete term!', 'deleteTerm', error, store.dispatch, true);
            });
    },
    getColumns() {
        return httpClient.get('/columns')
            .then(response => {
                response.data.sort((a, b) => a.position - b.position);
                response.data.forEach(column => {
                    column.dropdownOptions.sort((a, b) => a.position - b.position);
                });
                store.dispatch('TermManager/updateColumns', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot fetch columns from the database!', 'getColumns', error, store.dispatch, true);
            });
    },
    addColumn(payload) {
        return httpClient.post('/columns', payload)
            .then(() => {
                this.getColumns();
                this.getTerms();
            })
            .catch(error => {
                handleError('error', 'Cannot add column!', 'addColumn', error, store.dispatch, true);
            });
    },
    updateColumn(payload) {
        return httpClient.put('/columns/' + payload.id, payload)
            .then(response => {
                showNotification('success', 'Column was successfully updated!', store.dispatch, true);
                store.dispatch('TermManager/updateSelectedColumn', response.data);
                store.dispatch('TermManager/replaceColumn', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot update column!', 'updateColumn', error, store.dispatch, true);
            });
    },
    deleteColumn(payload) {
        return httpClient.delete('/columns/' + payload.id)
            .then(() => {
                showNotification('success', 'Column was successfully deleted!', store.dispatch, true);
                store.dispatch('TermManager/updateSelectedTerm', null);
                store.dispatch('TermManager/updateSelectedColumn', null);
                this.getColumns();
                this.getTerms();
            })
            .catch(error => {
                handleError('error', 'Cannot delete column!', 'deleteColumn', error, store.dispatch, true);
            });
    },
    reorderColumns(payload) {
        return httpClient.post('/columns/reorder', payload)
            .then(() => {
                return this.getColumns();
            })
            .then(() => {
                showNotification('success', 'Columns were successfully reordered!', store.dispatch, true);
            })
            .catch(error => {
                handleError('error', 'Cannot reorder columns!', 'reorderColumns', error, store.dispatch, true);
            });
    }
}