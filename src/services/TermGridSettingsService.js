import httpClient from "./HttpClient";
import {handleError, showNotification} from "../helpers/GenericHelper";
import store from '../store/index';
import NotificationType from "../components/Notificater/domain/NotificationType";
import TermManagerService from "./TermManagerService";
export default {
    getColumns() {
        return httpClient.get('/columns')
            .then(response => {
                response.data.sort((a, b) => a.position - b.position);
                response.data.forEach(column => {
                    column.dropdownOptions.sort((a, b) => a.position - b.position);
                });
                store.dispatch('TermGridSettings/updateColumns', response.data);
            })
            .catch(error => {
                handleError('Cannot fetch columns from the database', 'getColumns', error);
            });
    },
    addColumn(payload) {
        return httpClient.post('/columns', payload)
            .then(() => {
                this.getColumns();
                TermManagerService.getTerms();
            })
            .catch(error => {
                handleError('Cannot add column', 'addColumn', error);
            });
    },
    updateColumn(payload) {
        return httpClient.put('/columns/' + payload.id, payload)
            .then(response => {
                showNotification(NotificationType.SUCCESS, 'Column was successfully updated');
                store.dispatch('TermGridSettings/updateSelectedColumn', response.data);
                store.dispatch('TermGridSettings/replaceColumn', response.data);
            })
            .catch(error => {
                handleError('Cannot update column', 'updateColumn', error);
            });
    },
    deleteColumn(payload) {
        return httpClient.delete('/columns/' + payload.id)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Column was successfully deleted');
                store.dispatch('TermGridSettings/updateSelectedColumn', null);
                this.getColumns();
                store.dispatch('TermManager/updateSelectedTerm', null);
                TermManagerService.getTerms();
            })
            .catch(error => {
                handleError('Cannot delete column', 'deleteColumn', error);
            });
    },
    reorderColumns(payload) {
        return httpClient.post('/columns/reorder', payload)
            .then(() => {
                return this.getColumns();
            })
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Columns were successfully reordered');
            })
            .catch(error => {
                handleError('Cannot reorder columns', 'reorderColumns', error);
            });
    }
}