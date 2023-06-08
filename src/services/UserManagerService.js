import httpClient from "./HttpClient";
import {showNotification, handleError} from "../helpers/GenericHelper";
import store from '../store/index';

export default {
    getUsers() {
        return httpClient.get('/users')
            .then(response => {
                store.dispatch('UserManager/updateUsers', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot fetch users from the database!', 'getUsers', error, store.dispatch, true);
            });
    },
    addUser(payload) {
        return httpClient.post('/users', payload)
            .then(() => {
                showNotification('success', 'User was successfully added!', store.dispatch, true);
                this.getUsers();
            })
            .catch(error => {
                handleError('error', 'Cannot add user!', 'addUser', error, store.dispatch, true);
            });
    },
    updateUser(payload) {
        return httpClient.put('/users/' + payload.id, payload)
            .then(() => {
                showNotification('success', 'User was successfully updated!', store.dispatch, true);
                store.dispatch('UserManager/updateSelectedUser', payload);
                this.getUsers();
            })
            .catch(error => {
                handleError('error', 'Cannot update user!', 'updateUser', error, store.dispatch, true);
            });
    },
    deleteUser(payload) {
        return httpClient.delete('/users/' + payload.id)
            .then(() => {
                showNotification('success', 'User was successfully deleted!', store.dispatch, true);
                store.dispatch('UserManager/updateSelectedUser', null);
                this.getUsers();
            })
            .catch(error => {
                handleError('error', 'Cannot delete user!', 'deleteUser', error, store.dispatch, true);
            });
    },
    getPrivileges() {
        return httpClient.get('/privileges')
            .then(response => {
                store.dispatch('UserManager/updatePrivileges', response.data);
            })
            .catch(error => {
                handleError('error', 'Cannot fetch privileges from the database!', 'getPrivileges', error, store.dispatch, true);
            });
    }
}