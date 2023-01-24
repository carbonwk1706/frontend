import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('../views/Wishlist.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/book/:id',
    name: 'book',
    component: () => import('../views/Book.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
