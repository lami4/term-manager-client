import Vue from 'vue'
import VueRouter from 'vue-router'
import TermManager from '../views/TermManager/TermManager'
import UserManager from "../views/UserManager/UserManager";
import SuggestionManager from "../views/SuggestionManager/SuggestionManager";
import TermGridSettings from "../views/TermGridSettings/TermGridSettings";
import store from '../store';
import {showNotification} from "../helpers/GenericHelper";
import NotificationType from '../components/Notificater/domain/NotificationType';
import AuthenticationService from '../services/AuthenticationService';
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: { path: "/terms" },
  },
  {
    path: '/terms',
    name: 'TermManager',
    component: TermManager
  },
  {
    path: '/users',
    name: 'UserManager',
    component: UserManager,
    beforeEnter: async (to, from, next) => {
      if (from.name === null) {
        await AuthenticationService.validateSession();
      } 
      if (store.state.Session.userPrivileges.includes(1)) {
        next();
        return;
      }
      showNotification(NotificationType.ERROR, "You have no access to the page and were redirected to Terms")
      next("/terms");
    },
  },
  {
    path: '/suggestions',
    name: 'SuggestionManager',
    component: SuggestionManager,
    beforeEnter: async (to, from, next) => {
      if (from.name === null) {
        await AuthenticationService.validateSession();
      } 
      if (store.state.Session.userPrivileges.includes(4)) {
        next();
        return;
      }
      showNotification(NotificationType.ERROR, "You have no access to the page and were redirected to Terms")
      next("/terms");
    },
  },
  {
    path: '/term-grid-settings',
    name: 'TermGridSettings',
    component: TermGridSettings,
    beforeEnter: async (to, from, next) => {
      if (from.name === null) {
        await AuthenticationService.validateSession();
      }
      if (store.state.Session.userPrivileges.includes(3)) {
        next();
        return;
      }
      showNotification(NotificationType.ERROR, "You have no access to the page and were redirected to Terms")
      next("/terms");
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
