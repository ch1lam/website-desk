import Vue from "vue";
import VueRouter from "vue-router";

import layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "登陆",
    component: () => import("@/views/login/index.vue")
  },
  {
    path: "/",
    name: "首页",
    component: layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue")
      },
      {
        path: "course",
        name: "Course",
        component: () => import("@/views/course/index.vue")
      },
      {
        path: "upload",
        name: "Upload",
        component: () => import("@/views/upload/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
