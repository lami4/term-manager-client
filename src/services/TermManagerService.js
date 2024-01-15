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
                handleError('Cannot fetch terms from the database', 'getTerms', error);
            });
    },
    addTerm(payload) {
        store.state.notification.ignoreNextWsMessage = true;
        return httpClient.post('/terms', payload)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Term was successfully added');
                this.getTerms();
            })
            .catch(error => {
                handleError('Cannot add term', 'addTerm', error);
            });
    },
    updateTerm(payload) {
        return httpClient.put('/terms/' + payload.id, payload)
            .then(response => {
                showNotification(NotificationType.SUCCESS, 'Term was successfully updated');
                store.dispatch('TermManager/updateSelectedTerm', response.data);
                store.dispatch('TermManager/replaceTerm', response.data);
            })
            .catch(error => {
                handleError('Cannot update term', 'updateTerm', error);
            });
    },
    deleteTerm(payload) {
        return httpClient.delete('/terms/' + payload.id)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Term was successfully deleted');
                store.dispatch('TermManager/updateSelectedTerm', null);
                this.getTerms();
            })
            .catch(error => {
                handleError('Cannot delete term', 'deleteTerm', error);
            });
    }
}