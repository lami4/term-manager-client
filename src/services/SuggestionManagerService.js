import httpClient from "./HttpClient";

export default {
    getSuggestions() {
        return httpClient.get('/suggestions');
    },
    addSuggestion(payload) {
        return httpClient.post('/suggestions', payload);
    },
    updateSuggestion(payload) {
        return httpClient.put('/suggestions/' + payload.id, payload);
    },
    deleteSuggestion(payload) {
        return httpClient.delete('/suggestions/' + payload.id);
    },
    acceptSuggestion(payload) {
        return httpClient.put(`/suggestions/${payload.id}/accept`, payload);
    }
}