export const namespaced = true

export const state = {
    notifications: [],
    ignoreNextWsMessage: false
}

export const actions = {
    add({commit}, notification) {
        commit('PUSH', notification);
    },
    delete({commit}, notification) {
        commit('REMOVE', notification);
    },
    setIgnoreNextWsMessage({commit}, boolean) {
        commit('SET_IGNORE_NEXT_WS_MESSAGE', boolean);
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
    },
    SET_IGNORE_NEXT_WS_MESSAGE(state, value) {
        state.ignoreNextWsMessage = value;
    }
}