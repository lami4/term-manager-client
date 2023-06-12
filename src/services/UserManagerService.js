import httpClient from "./HttpClient";
import {showNotification, handleError} from "../helpers/GenericHelper";
import NotificationType from "../components/Notificater/domain/NotificationType";
import store from '../store/index';

export default {
    getUsers() {
        return httpClient.get('/users')
            .then(response => {
                store.dispatch('UserManager/updateUsers', response.data);
            })
            .catch(error => {
                handleError('Cannot fetch users from the database!', 'getUsers', error);
            });
    },
    addUser(payload) {
        return httpClient.post('/users', payload)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'User was successfully added!');
                this.getUsers();
            })
            .catch(error => {
                handleError('Cannot add user!', 'addUser', error);
            });
    },
    updateUser(payload) {
        return httpClient.put('/users/' + payload.id, payload)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'User was successfully updated!');
                store.dispatch('UserManager/updateSelectedUser', payload);
                this.getUsers();
            })
            .catch(error => {
                handleError('Cannot update user!', 'updateUser', error);
            });
    },
    deleteUser(payload) {
        return httpClient.delete('/users/' + payload.id)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'User was successfully deleted!');
                store.dispatch('UserManager/updateSelectedUser', null);
                this.getUsers();
            })
            .catch(error => {
                handleError('Cannot delete user!', 'deleteUser', error);
            });
    },
    getPrivileges() {
        return httpClient.get('/privileges')
            .then(response => {
                store.dispatch('UserManager/updatePrivileges', response.data);
            })
            .catch(error => {
                handleError('Cannot fetch privileges from the database!', 'getPrivileges', error);
            });
    },
    resetPassword(payload) {
        return httpClient.put('/users/' + payload.id + "/reset-password", payload)
            .then(() => {
                showNotification(NotificationType.SUCCESS, 'Password was successfully changed!');
            })
            .catch(error => {
                handleError('Cannot update password!', 'resetPassword', error);
            });
    }
}