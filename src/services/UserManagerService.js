import httpClient from "./HttpClient";

export default {
    getUsers() {
        return httpClient.get('/users');
    },
    addUser(payload) {
        return httpClient.post('/users', payload);
    },
    updateUser(payload) {
        return httpClient.put('/users/' + payload.id, payload);
    },
    deleteUser(payload) {
        return httpClient.delete('/users/' + payload.id);
    },
    getPrivileges() {
        return httpClient.get('/privileges');
    }
}