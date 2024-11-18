import Vue from 'vue'
import VueRouter from 'vue-router'
import CategoryLayout from '../views/CategoryLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/category/1'
  },
  {
    path: '/category/:id',
    component: CategoryLayout,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router