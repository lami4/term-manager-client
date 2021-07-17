import axios from 'axios';

const HTTP = axios.create({
baseURL: 'http://localhost:4567'
})

export default {
    getTerms(uri) {
        return HTTP.get(uri);
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
    getColumns(uri) {
        return HTTP.get(uri);
    },
    addColumn(uri, payload) {
        return HTTP.post(uri, payload);
    },
    updateColumn(uri, payload) {
        return HTTP.put(uri, payload);
    },
    deleteColumn(uri) {
        return HTTP.delete(uri);
    }
}