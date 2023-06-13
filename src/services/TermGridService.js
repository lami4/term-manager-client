import httpClient from "./HttpClient";
import {handleError, showNotification} from "../helpers/GenericHelper";
import store from '../store/index';
import NotificationType from "../components/Notificater/domain/NotificationType";

export default {
    getTerms() {
        return httpClient.get('/terms')
            .then(response => {
                store.dispatch('TermManager/updateTerms', response.data);
            })
            .catch(error => {
                handleError('Cannot fetch terms from the database!', 'getTerms', error);
            });
    },
    addTerm(payload) {
        store.state.notification.ignoreNextWsMessage = true;
        return httpClient.post('/terms', payload)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Term was successfully added!');
                this.getTerms();
            })
            .catch(error => {
                handleError('Cannot add term!', 'addTerm', error);
            });
    },
    updateTerm(payload) {
        return httpClient.put('/terms/' + payload.id, payload)
            .then(response => {
                showNotification(NotificationType.SUCCESS, 'Term was successfully updated!');
                store.dispatch('TermManager/updateSelectedTerm', response.data);
                store.dispatch('TermManager/replaceTerm', response.data);
            })
            .catch(error => {
                handleError('Cannot update term!', 'updateTerm', error);
            });
    },
    deleteTerm(payload) {
        return httpClient.delete('/terms/' + payload.id)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Term was successfully deleted!');
                store.dispatch('TermManager/updateSelectedTerm', null);
                this.getTerms();
            })
            .catch(error => {
                handleError('Cannot delete term!', 'deleteTerm', error);
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
                handleError('Cannot fetch columns from the database!', 'getColumns', error);
            });
    },
    addColumn(payload) {
        return httpClient.post('/columns', payload)
            .then(() => {
                this.getColumns();
                this.getTerms();
            })
            .catch(error => {
                handleError('Cannot add column!', 'addColumn', error);
            });
    },
    updateColumn(payload) {
        return httpClient.put('/columns/' + payload.id, payload)
            .then(response => {
                showNotification(NotificationType.SUCCESS, 'Column was successfully updated!');
                store.dispatch('TermManager/updateSelectedColumn', response.data);
                store.dispatch('TermManager/replaceColumn', response.data);
            })
            .catch(error => {
                handleError('Cannot update column!', 'updateColumn', error);
            });
    },
    deleteColumn(payload) {
        return httpClient.delete('/columns/' + payload.id)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Column was successfully deleted!');
                store.dispatch('TermManager/updateSelectedTerm', null);
                store.dispatch('TermManager/updateSelectedColumn', null);
                this.getColumns();
                this.getTerms();
            })
            .catch(error => {
                handleError('Cannot delete column!', 'deleteColumn', error);
            });
    },
    reorderColumns(payload) {
        return httpClient.post('/columns/reorder', payload)
            .then(() => {
                return this.getColumns();
            })
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Columns were successfully reordered!');
            })
            .catch(error => {
                handleError('Cannot reorder columns!', 'reorderColumns', error);
            });
    }
}