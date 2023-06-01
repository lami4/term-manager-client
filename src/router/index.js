import Vue from 'vue'
import VueRouter from 'vue-router'
import TermManager from '../views/TermManager/TermManager'
import About from '../components/About'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'about',
    component: About
  },
  {
    path: '/term-manager',
    name: 'TermManager',
    component: TermManager
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
