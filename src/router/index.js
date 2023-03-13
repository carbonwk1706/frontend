import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../components/NotFound.vue"),
  },

  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/User/Cart.vue"),
  },
  {
    path: "/wishlist",
    name: "wishlist",
    component: () => import("../views/User/Wishlist.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/User/Profile.vue"),
  },
  {
    path: '/book/:id',
    name: 'book',
    component: () => import('../views/Sell/Book.vue')
  },
  {
    path: '/readbook/:id',
    name: 'readbook',
    component: () => import('../views/User/ReadBook.vue'),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
      hideSidebar: true,
      showNavCoin: true,
    },
  }
  ,
  {
    path: '/login',
    name: 'loginadmin',
    component: () => import('../views/Admin/LoginAdmin.vue')
  }
  ,
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin/Admin.vue')
  }
  ,
  {
    path: '/usertable',
    name: 'usertable',
    component: () => import('../views/Admin/UserTable.vue')
  }
  ,
  {
    path: '/mybook',
    name: 'mybook',
    component: () => import('../views/User/MyBook.vue')
  },
  {
    path: "/book/:id",
    name: "book",
    component: () => import("../views/Sell/Book.vue"),
  },
  {
    path: "/login",
    name: "loginadmin",
    component: () => import("../views/Admin/LoginAdmin.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin/Admin.vue"),
  },
  {
    path: "/usertable",
    name: "usertable",
    component: () => import("../views/Admin/UserTable.vue"),
  },
  {
    path: "/mybook",
    name: "mybook",
    component: () => import("../views/User/MyBook.vue"),
  },
  {
    path: "/orderhistory",
    name: "orderhistory",
    component: () => import("../views/User/OrderHistory.vue"),
  },
  {
    path: "/receiptbook/:id",
    name: "receiptbook",
    component: () => import("../views/User/DetailOrder.vue"),
  },
  {
    path: "/registersell",
    name: "registersell",
    component: () => import("../views/User/RegisterSell.vue"),
  },
  {
    path: "/books/all",
    name: "books",
    component: () => import("../views/Sell/AllBooks.vue"),
  },
  {
    path: "/books/cartoon/all",
    name: "cartoon",
    component: () => import("../views/Sell/AllCartoon.vue"),
  },
  {
    path: "/books/novel/all",
    name: "novel",
    component: () => import("../views/Sell/AllNovel.vue"),
  },
  {
    path: "/bestseller",
    name: "bestseller",
    component: () => import("../views/Sell/BestSeller.vue"),
  },
  {
    path: "/newentry",
    name: "newentry",
    component: () => import("../views/Sell/NewEntry.vue"),
  },
  {
    path: "/recommend",
    name: "recommend",
    component: () => import("../views/Sell/Recommend.vue"),
  },
  {
    path: "/halloffame",
    name: "halloffame",
    component: () => import("../views/Sell/Halloffame.vue"),
  },
  {
    path: "/admintable",
    name: "admintable",
    component: () => import("../views/Admin/AdminTable.vue"),
  },
  {
    path: "/usertable",
    name: "usertable",
    component: () => import("../views/Admin/UserTable.vue"),
  },
  {
    path: "/approvetable",
    name: "approvetable",
    component: () => import("../views/Admin/ApproveTable.vue"),
  },
  {
    path: "/request/:id",
    name: "request",
    component: () => import("../views/Admin/DetailRequest.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
    },
  },
  {
    path: "/coin",
    name: "coin",
    component: () => import("../views/Coin.vue"),
  },
  {
    path: "/usertable/:id",
    name: "edituser",
    component: () => import("../views/Admin/EditUserForm.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
    },
  },
  {
    path: "/newusertable",
    name: "newuser",
    component: () => import("../views/Admin/NewUserForm.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../components/Shop/Checkout.vue"),
  },
  {
    path: "/admintable/:id",
    name: "editadmin",
    component: () => import("../views/Admin/EditAdminForm.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
    },
  },
  {
    path: "/newadmintable",
    name: "newadmin",
    component: () => import("../views/Admin/NewAdminForm.vue"),
  },
  {
    path: "/historyadmin",
    name: "historyadmin",
    component: () => import("../views/Admin/HistoryAdmin.vue"),
  },
  {
    path: "/userhistoryadmin",
    name: "userhistoryadmin",
    component: () => import("../views/Admin/UserHistoryAdmin.vue"),
  },
  {
    path: "/detailusercrud/:id",
    name: "detailusercrud",
    component: () => import("../views/Admin/DetailUserCRUD.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
    },
  },
  {
    path: "/search/:searchTerm?",
    name: "search",
    component: () => import("../views/Sell/SearchBooks.vue"),
  },
  {
    path: "/bookadmin",
    name: "bookadmin",
    component: () => import("../views/Admin/Book/BookAdmin.vue"),
  },
  {
    path: "/checkoutcoin",
    name: "checkoutcoin",
    component: () => import("../components/Coin/Checkout.vue"),
  },
  {
    path: "/checkoutcoin/qrcode",
    name: "checkoutcoinQRCode",
    component: () => import("../components/Coin/CheckoutQR.vue"),
  },
  {
    path: "/coinhistory",
    name: "coinhistory",
    component: () => import("../components/Coin/CoinHistory.vue"),
  },
  {
    path: "/coinhistorydetil/:id",
    name: "coinhistorydetail",
    component: () => import("../components/Coin/DetailHistory.vue"),
    meta: {
      hideFooter: true,
      hideNavbar: true,
      hideSidebar: true,
      showNavCoin: true,
    },
  },
  {
    path: "/newbookadmin",
    name: "newbookadmin",
    component: () => import("../views/Admin/Book/AddBook.vue"),
  },
  {
    path: "/bookadmin/:id",
    name: "editbookadmin",
    component: () => import("../views/Admin/Book/EditBookForm.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
    },
  },
  {
    path: "/detailbookadmin/:id",
    name: "detailbookadmin",
    component: () => import("../views/Admin/Book/DetailBookAdmin.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
    },
  },
  {
    path: "/requestcoin/:id",
    name: "requestcoindetail",
    component: () => import("../views/Admin/DeatailRequsetCoin.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
    },
  },
  {
    path: "/historybookcrud",
    name: "historybookcrud",
    component: () => import("../views/Admin/BookHistory.vue"),
  },
  {
    path: "/detailbookcrud/:id",
    name: "detailbookcrud",
    component: () => import("../views/Admin/DetailBookCRUD.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
    },
  },
  {
    path: "/newbook",
    name: "newbook",
    component: () =>
      import("../views/UserSell/BookUserSell/AddBookUserSell.vue"),
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import("../views/UserSell/Payment.vue"),
  },
  {
    path: "/paymenthistory",
    name: "paymenthistory",
    component: () => import("../views/UserSell/PaymentHistory.vue"),
  },
  {
    path: "/bookqueue",
    name: "bookqueue",
    component: () => import("../views/UserSell/BookUserSell/BookQueue.vue"),
  },
  {
    path: "/booktable",
    name: "booktable",
    component: () => import("../views/UserSell/BookUserSell/BookTable.vue"),
  },
  {
    path: "/booktable/:id",
    name: "editbook",
    component: () =>
      import("../views/UserSell/BookUserSell/EditBookUserSell.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
      hideSidebar: true,
    },
  },
  {
    path: "/allreview",
    name: "allreview",
    component: () => import("../components/Shop/AllReview.vue"),
  },
  {
    path: "/historyrequestbook/:id",
    name: "historyrequestbook",
    component: () => import("../views/UserSell/BookUserSell/RequestBookDetail"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
      hideSidebar: true,
    },
  },
  {
    path: "/detailbookusersell/:id",
    name: "detailbookusersell",
    component: () => import("../views/UserSell/BookUserSell/DetailBookUserSell.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
      hideSidebar: true,
    },
  },
  {
    path: "/detailrequestbook/:id",
    name: "detailrequestbook",
    component: () => import("../views/Admin/DetailRequestBook.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
    },
  },
  {
    path: "/detailrequestpayment/:id",
    name: "detailrequestpayment",
    component: () => import("../views/Admin/DetailRequestPayment.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
    },
  },
  {
    path: "/historybookusercrud",
    name: "historybookusercrud",
    component: () => import("../views/UserSell/BookUserSell/BookHistory.vue"),
  },
  {
    path: "/detailbookusercrud/:id",
    name: "detailbookusercrud",
    component: () => import("../views/UserSell/BookUserSell/DetailBookCRUD.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
      hideSidebar: true,
    },
  },
  {
    path: "/detailpaymenthistory/:id",
    name: "detailpaymenthistory",
    component: () => import("../views/UserSell/DetailPaymentHistory.vue"),
    meta: {
      hideFooter: true,
      hideFooterCoin: true,
      hideNavbar: true,
      hideNavbarCoin: true,
      hideSidebar: true,
    },
  },
  {
    path: "/carousel",
    name: "carousel",
    component: () => import("../views/Admin/Carousel.vue"),
  },
];

const scrollBehavior = (to, from, savedPosition) => {
  if (
    to.name === "home" ||
    to.name == "cart" ||
    to.name == "checkout" ||
    to.name == "wishlist" ||
    to.name == "profile" ||
    to.name == "mybook" ||
    to.name == "orderhistory" ||
    to.name == "registersell" ||
    to.name == "coinhistory"  ||
    to.name == "checkout" || 
    to.name == "book"
  ) {
    return { x: 0, y: 0 };
  } else {
    return savedPosition;
  }
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
});

export default router;
