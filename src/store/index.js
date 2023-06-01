import Vue from 'vue';
import Vuex from 'vuex';
import * as notification from "./modules/Notification.js";
import * as UserManager from "./modules/UserManager.js";
import * as TermManager from "./modules/TermManager.js";
import * as SuggestionManager from "./modules/SuggestionManager.js";
import * as Session from "./modules/Session.js";
export const namespaced = true

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notification,
    UserManager,
    TermManager,
    SuggestionManager,
    Session
  },
  state: {},
  mutations: {},
  actions: {}
})
