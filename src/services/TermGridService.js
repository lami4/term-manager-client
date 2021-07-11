import axios from 'axios';

const HTTP = axios.create({
baseURL: 'http://localhost:4567'
})

export default {
    getTerms() {
        return HTTP.get('/terms');
    },
    addTerm(uri, payload) {
        return HTTP.post(uri, payload);
    },
    updateTerm(uri, payload) {
        return HTTP.put(uri, payload);
    },
    deleteTerm(uri) {
        return HTTP.delete(uri);
    },
    getColumns() {
        return HTTP.get('/columns');
    },
    addColumn(bodyJson) {
        return HTTP.post('/columns', bodyJson);
    },
    updateColumn(uri, payload) {
        return HTTP.put(uri, payload);
    },
    deleteColumn(selectedColumn) {
        return HTTP.delete(`/columns/${selectedColumn.id}`);
    }
}