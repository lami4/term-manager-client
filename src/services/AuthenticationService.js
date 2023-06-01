import store from '../store/index';
import httpClient from "./HttpClient";

export default {
    signIn(credentials) {
        return httpClient.get('/auth/login', {headers: {...credentials}}).then(response => {
            store.dispatch('Session/setIsSignedIn', true);
            return response;
        });
    },
    signOut() {
        return httpClient.get('/auth/logout').then(() => {
            store.dispatch('Session/setIsSignedIn', false);
        });
    },
    validateSession() {
        return httpClient.get('/auth/validate').then(response => {
            store.dispatch('Session/setIsSignedIn', true);
            store.dispatch('Session/setPrivileges', response.data.privileges);
        });
    }
}