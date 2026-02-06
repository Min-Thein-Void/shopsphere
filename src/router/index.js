import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import CheckOut from "@/components/CheckOut.vue";
import CreateProduct from "@/components/admin/CreateProduct.vue";
import Home from "@/components/Home.vue";
import ProductDetail from "@/components/ProductDetail.vue";
import Products from "@/components/Products.vue";
import { useUserStore } from "@/stores/useUserStore";
import { createRouter, createWebHistory } from "vue-router";
import OrderLists from "@/components/admin/OrderLists.vue";
import Profile from "@/components/Profile.vue";
import OrderHistory from "@/components/OrderHistory.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/shop",
      name: "Shop",
      component: Products,
    },
    {
      path: "/create",
      name: "Create",
      component: CreateProduct,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/detailof/:id",
      name: "Detail",
      component: ProductDetail,
      props: true,
    },
    {
      path: "/checkout",
      name: "CheckOut",
      component: CheckOut,
      beforeEnter(to, from, next) {
        let store = useUserStore();
        if (store.isAuthenticated) {
          next();
        } else {
          next({ name: "Login" });
        }
      },
    },
    {
      path: "/orderlists",
      name: "OrderLists",
      component: OrderLists,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/orderhistory",
      name: "OrderHistory",
      component: OrderHistory,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter(to, from, next) {
        let store = useUserStore();
        if (!store.isAuthenticated) {
          next();
        } else {
          next({ name: "Home" });
        }
      },
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      beforeEnter(to, from, next) {
        let store = useUserStore();
        if (!store.isAuthenticated) {
          next();
        } else {
          next({ name: "Home" });
        }
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
    },
  ],
});

export default router;
