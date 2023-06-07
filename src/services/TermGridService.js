import httpClient from "./HttpClient";

export default {
    getTerms() {
        return httpClient.get('/terms');
    },
    addTerm(payload) {
        return httpClient.post('/terms', payload);
    },
    updateTerm(payload) {
        return httpClient.put('/terms/' + payload.id, payload);
    },
    deleteTerm(payload) {
        return httpClient.delete('/terms/' + payload.id);
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