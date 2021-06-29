import axios from 'axios';

const HTTP = axios.create({
baseURL: 'http://localhost:4567'
})

export default {
    getTerms() {
        return HTTP.get('/terms');
    },
    addTerm(jsonString) {
        return HTTP.put('/terms', jsonString);
    },
    updateTerm(jsonString) {
        return HTTP.post('/terms', jsonString);
    },
    deleteTerm(selectedTermId) {
        return HTTP.delete('/terms', {data: selectedTermId});
    },
    getColumns() {
        return HTTP.get('/columns');
    },
    addColumn(columnName) {
        return HTTP.put('/columns', columnName);
    },
    updateColumn(selectedColumn) {
        return HTTP.post('/columns', selectedColumn);
    },
    deleteColumn(selectedColumn) {
        return HTTP.delete('/columns', {data: selectedColumn.html_id});
    }
}