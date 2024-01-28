export const namespaced = true

export const state = {
    notifications: []
}

export const actions = {
    add({commit}, notification) {
        commit('PUSH', notification);
    },
    delete({commit}, notification) {
        commit('REMOVE', notification);
    }
}

let counter = 1
export const mutations = {
    PUSH(state, notification) {
        state.notifications.push({
            ...notification,
            id: counter++
        });
    },
    REMOVE(state, notification) {
        state.notifications = state.notifications.filter(item => {
            return item.id !== notification.id;
        })
    }
}