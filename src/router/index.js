import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      transitionName: "slide-left",
    },
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("../views/Shop.vue"),
    meta: {
      transitionName: "slide-right",
    },
  },
  {
    path: "/product/:slug",
    name: "Product",
    component: () => import("../views/Product.vue"),
    meta: {
      transitionName: "component-fade",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      transitionName: "slide-left",
    },
  },
  {
    path: "/404",
    component: () => import("../views/NotFound.vue"),
    meta: {
      transitionName: "slide-right",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFound.vue"),
    redirect: "/404",
    meta: {
      transitionName: "slide-right",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;