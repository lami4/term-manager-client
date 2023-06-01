import axios from 'axios';

const HTTP = axios.create({baseURL: 'http://localhost:4567'})
HTTP.defaults.withCredentials = true;

export default {
    getUsers(uri) {
        return HTTP.get(uri);
    },
    addUser(uri, payload) {
        return HTTP.post(uri, payload);
    },
    updateUser(uri, payload) {
        return HTTP.put(uri, payload);
    },
    deleteUser(uri) {
        return HTTP.delete(uri);
    },
    getPrivileges(uri) {
        return HTTP.get(uri);
    }
}