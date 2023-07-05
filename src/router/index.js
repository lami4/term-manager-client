import Vue from 'vue'
import VueRouter from 'vue-router'
import TermManager from '../views/TermManager/TermManager'
import UserManager from "../views/UserManager/UserManager";
import SuggestionManager from "../views/SuggestionManager/SuggestionManager";

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
    component: UserManager
  },
  {
    path: '/suggestions',
    name: 'SuggestionManager',
    component: SuggestionManager
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
