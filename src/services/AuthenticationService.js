import store from '../store/index';
import httpClient from "./HttpClient";
import * as WS from "../websocket/ws";
import {showNotification} from "../helpers/GenericHelper";
import NotificationType from "../components/Notificater/domain/NotificationType";
import SystemPrivileges from "../views/UserManager/domain/SystemPrivileges";
import Action from "./domain/Action";
import SuggestionManagerService from "./SuggestionManagerService";
import TermGridService from "./TermGridService";

export default {
    signIn(credentials) {
        return httpClient.get('/auth/login', {headers: {...credentials}})
            .then(response => {
                store.dispatch('Session/setIsSignedIn', true);
                store.dispatch('Session/setPrivileges', response.data.privileges);
                WS.connect(this.subscriberCallback);
                return response;
            });
    },
    signOut() {
        return httpClient.get('/auth/logout')
            .then(() => {
                store.dispatch('Session/setIsSignedIn', false);
                store.dispatch('Session/setPrivileges', []);
                WS.disconnect();
            });
    },
    validateSession() {
        return httpClient.get('/auth/validate')
            .then(response => {
                store.dispatch('Session/setIsSignedIn', true);
                store.dispatch('Session/setPrivileges', response.data.privileges);
                WS.connect(this.subscriberCallback);
            })
            .catch(() => {
                console.info("No session");
            });
    },
    subscriberCallback({ body: message }) {
        message = JSON.parse(message);
        if (message.action === Action.ADD_SUGGESTION && isUserSuggestionManager) {
            SuggestionManagerService.getSuggestions();
            if (store.state.notification.ignoreNextWsMessage) {
                store.dispatch('notification/setIgnoreNextWsMessage', false);
                return;
            }
            showNotification(NotificationType.SUCCESS, "New suggestion");
        }
        if (message.action === Action.ADD_TERM) {
            TermGridService.getTerms();
            if (store.state.notification.ignoreNextWsMessage) {
                store.dispatch('notification/setIgnoreNextWsMessage', false);
                return;
            }
            showNotification(NotificationType.SUCCESS, "New term");
        }
        function isUserSuggestionManager() {
            return store.state.Session.userPrivileges.includes(SystemPrivileges.SUGGESTION_MANAGER);
        }
    }
}