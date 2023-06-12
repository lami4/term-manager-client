import httpClient from "./HttpClient";
import TermGridService from "./TermGridService";
import {handleError, showNotification} from "../helpers/GenericHelper";
import store from '../store/index';
import NotificationType from "../components/Notificater/domain/NotificationType";
import SystemPrivileges from "../views/UserManager/domain/SystemPrivileges";

export default {
    getSuggestions() {
        return httpClient.get('/suggestions')
            .then(response => {
                store.dispatch('SuggestionManager/updateSuggestions', response.data);
            })
            .catch(error => {
                handleError('Cannot fetch suggestions from the database!', 'getSuggestions', error);
            });
    },
    addSuggestion(payload, refreshSuggestions) {
        return httpClient.post('/suggestions', payload)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Suggestion was successfully added!');
                if (store.state.Session.userPrivileges.includes(SystemPrivileges.SUGGESTION_MANAGER)) {
                    this.getSuggestions();
                }
            })
            .catch(error => {
                handleError('Cannot add suggestion!', 'addSuggestion', error);
            });
    },
    updateSuggestion(payload) {
        return httpClient.put('/suggestions/' + payload.id, payload)
            .then(response => {
                showNotification(NotificationType.SUCCESS, 'Suggestion was successfully updated!');
                store.dispatch('SuggestionManager/updateSelectedSuggestion', response.data);
                this.getSuggestions();
            })
            .catch(error => {
                handleError('Cannot update suggestion!', 'updateSuggestion', error);
            });
    },
    deleteSuggestion(payload) {
        return httpClient.delete('/suggestions/' + payload.id)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Suggestion was successfully deleted!');
                store.dispatch('SuggestionManager/updateSelectedSuggestion', null);
                this.getSuggestions();
            })
            .catch(error => {
                handleError('Cannot delete suggestion!', 'deleteSuggestion', error);
            });
    },
    acceptSuggestion(payload) {
        return httpClient.put(`/suggestions/${payload.id}/accept`, payload)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Suggestion was successfully accepted!');
                store.dispatch('SuggestionManager/updateSelectedSuggestion', null);
                TermGridService.getTerms();
                this.getSuggestions();
            })
            .catch(error => {
                handleError('Cannot accept suggestion!', 'acceptSuggestion', error);
            });
    }
}