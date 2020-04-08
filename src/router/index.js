import Vue from "vue";
import VueRouter from "vue-router";

import layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/login",
  //   name: "登陆",
  //   component: () => import("@/views/login/index.vue")
  // },
  {
    path: "/",
    name: "首页",
    component: layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
