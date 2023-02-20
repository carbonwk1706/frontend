import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../components/NotFound.vue"),
  },

  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/User/Cart.vue')
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('../views/User/Wishlist.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/User/Profile.vue')
  },
  {
    path: '/book/:id',
    name: 'book',
    component: () => import('../views/Book.vue')
  }
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
    component: () => import('../views/User/MyBook.vue')
  },
  {
    path: '/orderhistory',
    name: 'orderhistory',
    component: () => import('../views/User/OrderHistory.vue')
  },
  {
    path: '/receiptbook/:id',
    name: 'receiptbook',
    component: () => import('../views/User/DetailOrder.vue')
  },
  {
    path: '/registersell',
    name: 'registersell',
    component: () => import('../views/User/RegisterSell.vue')

  },
  {
    path: '/bestseller',
    name: 'bestseller',
    component: () => import('../views/Bestseller/BestSeller.vue')
  },
  {
    path: '/bestseller/all',
    name: 'bestsellerall',
    component: () => import('../views/Bestseller/BestSellerAll.vue')
  },
  {
    path: '/bestseller/cartoon',
    name: 'bestsellercartoon',
    component: () => import('../views/Bestseller/BestSellerCartoon.vue')
  },
  {
    path: '/bestseller/novel',
    name: 'bestsellernovel',
    component: () => import('../views/Bestseller/BestSellerNovel.vue')
  },
  {
    path: '/newentry',
    name: 'newentry',
    component: () => import('../views/Newentry/NewEntry.vue')
  },
  {
    path: '/newentry/all',
    name: 'newentryall',
    component: () => import('../views/Newentry/NewEntryAll.vue')
  },
  {
    path: '/newentry/cartoon',
    name: 'newentrycartoon',
    component: () => import('../views/Newentry/NewEntryCartoon.vue')
  },
  {
    path: '/newentry/novel',
    name: 'newentrynovel',
    component: () => import('../views/Newentry/NewEntryNovel.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('../views/Sell/Recommend.vue')
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
    path: '/approvetable',
    name: 'approvetable',
    component: () => import('../views/ApproveTable.vue')
  },
  {
    path: '/request/:id',
    name: 'request',
    component: () => import('../views/DetailRequest.vue')
  },
  {
    path: '/coin',
    name: 'coin',
    component: () => import('../views/Coin.vue')
  }
  ,
  {
    path: '/usertable/:id',
    name: 'edituser',
    component: () => import('../views/EditUserForm.vue'),
    meta: {
      hideFooter: true
    }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../components/Shop/Checkout.vue')
  }
  ,
  {
    path: '/admintable/:id',
    name: 'editadmin',
    component: () => import('../views/EditAdminForm.vue')
  },{
    path: '/historyadmin',
    name: 'historyadmin',
    component: () => import('../views/HistoryAdmin.vue')
  },
  {
    path: '/search/:searchTerm?',
    name: 'search',
    component: () => import('../views/SearchBooks.vue')
  },
  {
    path: '/checkoutcoin',
    name: 'checkoutcoin',
    component: () => import('../components/Coin/Checkout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
