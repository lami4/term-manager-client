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
            .then(() => {
                showNotification('success', 'Term was successfully updated!', store.dispatch, true);
                store.dispatch('TermManager/updateSelectedTerm', payload);
                this.getTerms();
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
        return httpClient.get('/columns');
    },
    addColumn(payload) {
        return httpClient.post('/columns', payload);
    },
    updateColumn(payload) {
        return httpClient.put('/columns/' + payload.id, payload);
    },
    deleteColumn(payload) {
        return httpClient.delete('/columns/' + payload.id);
    },
    reorderColumns(payload) {
        return httpClient.post('/columns/reorder', payload);
    }
}