export function showNotification(type, message, dispatch, isRoot) {
    let notification = {
        type: type,
        message: message
    }
    dispatch('notification/add', notification, {root: isRoot})
}

export function handleError(type, message, action, error, dispatch, isRoot) {
    showNotification(type, message, dispatch, isRoot);
    console.error("Error while performing '" + action + "' action: " + error.message)
}