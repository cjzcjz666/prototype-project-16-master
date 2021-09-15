import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'base',
    component: () => import('../pages/Base')
  },
  {
    path: '/try',
    name: 'try',
    component: () => import('../pages/try')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router