import store from '../store/index';
import httpClient from "./HttpClient";
import * as WS from "../websocket/ws";
import {showNotification} from "../helpers/GenericHelper";
import NotificationType from "../components/Notificater/domain/NotificationType";
import SystemPrivileges from "../views/UserManager/domain/SystemPrivileges";
import Action from "./domain/Action";
import SuggestionManagerService from "./SuggestionManagerService";
import TermManagerService from "./TermManagerService";

export default {
    signIn(credentials) {
        return httpClient.get('/auth/login', {headers: {email: encodeURI(credentials.email), password: encodeURI(credentials.password)}})
            .then(response => {
                store.dispatch('Session/setIsSignedIn', true);
                store.dispatch('Session/setPrivileges', response.data.privileges);
                store.dispatch('Session/setUserEmail', response.data.userEmail);
                store.dispatch('Session/setUserId', response.data.userId);
                WS.connect(this.subscriberCallback);
                return response;
            })
            .catch(error => {
                if (error.response.status === 401) {
                    showNotification(NotificationType.ERROR, "Wrong credentials!");
                }
                if (error.response.status === 403) {
                    showNotification(NotificationType.ERROR, "Your user account is blocked!");
                }
                return Promise.reject(error);
            });
    },
    signOut() {
        return httpClient.get('/auth/logout')
            .then(() => {
                store.dispatch('Session/setIsSignedIn', false);
                store.dispatch('Session/setPrivileges', []);
                store.dispatch('Session/setUserEmail', null);
                store.dispatch('Session/setUserId', null);
                WS.disconnect();
            });
    },
    validateSession() {
        return httpClient.get('/auth/validate')
            .then(response => {
                store.dispatch('Session/setIsSignedIn', true);
                store.dispatch('Session/setPrivileges', response.data.privileges);
                store.dispatch('Session/setUserEmail', response.data.userEmail);
                store.dispatch('Session/setUserId', response.data.userId);
                WS.connect(this.subscriberCallback);
            })
            .catch(() => {
                console.info("No session");
            });
    },
    subscriberCallback({ body: message }) {
        //message = JSON.parse(message);
        console.log(message)
        // if (message.action === Action.ADD_SUGGESTION && isUserSuggestionManager) {
        //     SuggestionManagerService.getSuggestions();
        //     showNotification(NotificationType.SUCCESS, "New suggestion");
        // }
        // if (message.action === Action.ADD_TERM) {
        //     TermManagerService.getTerms();

        //     showNotification(NotificationType.SUCCESS, "New term");
        // }
        // function isUserSuggestionManager() {
        //     return store.state.Session.userPrivileges.includes(SystemPrivileges.SUGGESTION_MANAGER);
        // }
    }
}