import Vue from "vue";
import VueRouter from "vue-router";

import layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "登陆",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "白板",
    component: layout,
    // redirect: "/dashboard",
    children: [
      {
        path: "dashboard/:id",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
      },
      {
        path: "course",
        name: "Course",
        component: () => import("@/views/course/index.vue"),
      },
      {
        path: "resource",
        name: "Resource",
        component: () => import("@/views/resource/index.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/profile/index.vue"),
      },
      {
        path: "statistics",
        name: "Statistics",
        component: () => import("@/views/statistics/index.vue"),
      },
      {
        path: "courseManager",
        name: "CourseManager",
        component: () => import("@/views/courseManager/index.vue"),
      },
      {
        path: "chapterManager/:id",
        name: "ChapterManager",
        component: () => import("@/views/chapterManager/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
