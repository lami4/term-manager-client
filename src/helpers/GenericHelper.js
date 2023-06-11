import store from '../store/index';
import NotificationType from "../components/Notificater/domain/NotificationType";

export function showNotification(type, message) {
    let notification = {
        type: type,
        message: message
    }
    store.dispatch('notification/add', notification);
}

export function handleError(message, action, error) {
    showNotification(NotificationType.ERROR, message);
    console.error("Error while performing '" + action + "' action: " + error.message);
}