import Vue from 'vue'
import VueRouter from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import FinalApp from '../views/FinalApp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomeView
  },
  {
    path: '/Login',
    name: 'Login',
    
    component: () => import(/* webpackChunkName: "Login" */ '../views/LoginView.vue')
  },
  {
    path: '/Home',
    name: 'FinalApp',
    
    component: FinalApp
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
