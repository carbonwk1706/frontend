import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('../views/WishlistView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
