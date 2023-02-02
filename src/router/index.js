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
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/book/:id',
    name: 'book',
    component: () => import('../views/Book.vue')
  }
  // ,
  // {
  //   path: '/cart/:id',
  //   name: 'cart',
  //   component: () => import('../views/Cart.vue')
  // }
  ,
  {
    path: '/login',
    name: 'loginadmin',
    component: () => import('../views/LoginAdmin.vue')
  }
  ,
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue')
  }
  ,
  {
    path: '/usertable',
    name: 'usertable',
    component: () => import('../views/UserTable.vue')
  }
  ,
  {
    path: '/mybook',
    name: 'mybook',
    component: () => import('../views/MyBook.vue')
  },
  {
    path: '/orderhistory',
    name: 'orderhistory',
    component: () => import('../views/OrderHistory.vue')
  },
  {
    path: '/registersell',
    name: 'registersell',
    component: () => import('../views/RegisterSell.vue')

  },
  {
    path: '/bestseller',
    name: 'bestseller',
    component: () => import('../views/BestSeller.vue')
  },
  {
    path: '/newentry',
    name: 'newentry',
    component: () => import('../views/NewEntry.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('../views/Recommend.vue')
  },
  {
    path: '/admintable',
    name: 'admintable',
    component: () => import('../views/AdminTable.vue')
  },
  {
    path: '/usertable',
    name: 'usertable',
    component: () => import('../views/UserTable.vue')
  },
  {
    path: '/request/:id',
    name: 'request',
    component: () => import('../views/DetailRequest.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
