import axios from 'axios';

const HTTP = axios.create({baseURL: 'http://localhost:4567'})
HTTP.defaults.withCredentials = true;

export default {
    getSuggestions(uri) {
        return HTTP.get(uri);
    },
    addSuggestion(uri, payload) {
        return HTTP.post(uri, payload);
    },
    updateSuggestion(uri, payload) {
        return HTTP.put(uri, payload);
    },
    deleteSuggestion(uri) {
        return HTTP.delete(uri);
    }
}