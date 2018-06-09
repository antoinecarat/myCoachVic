import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Overview from '@/components/Overview'
import Connect from '@/components/Connect'
import Register from '@/components/Register'
import NewEntry from '@/components/NewEntry'
import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/connect',
      name: 'Connect',
      component: Connect
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/newentry',
      name: 'NewEntry',
      component: NewEntry
    },
    {
      path: '/newsport',
      name: 'NewSport',
      component: NewSport
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
