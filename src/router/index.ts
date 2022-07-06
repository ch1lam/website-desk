import { createRouter, createWebHistory } from "vue-router";

const Layout = () => import("../layout/index.vue");
const PageNotFound = () => import("@/views/404.vue");
const Login = () => import("../views/login/index.vue");
const Course = () => import("@/views/course/index.vue");
const Dashboard = () => import("@/views/dashboard/index.vue");
const Resource = () => import("@/views/resource/index.vue");
const Profile = () => import("@/views/profile/index.vue");
const CourseManager = () => import("@/views/courseManager/index.vue");
const UserManager = () => import("@/views/userManager/index.vue");
const ChapterManager = () => import("@/views/chapterManager/index.vue");

const routes = [
  {
    path: "/",
    name: "登陆",
    meta: {
      title: "登陆",
    },
    component: Login,
  },
  {
    path: "/404",
    name: "404",
    meta: {
      title: "页面不存在",
    },
    component: PageNotFound,
  },
  {
    path: "/",
    name: "白板",
    component: Layout,
    children: [
      {
        path: "course",
        name: "Course",
        meta: {
          title: "课程中心",
        },
        component: Course,
      },
      {
        path: "dashboard/:id",
        name: "Dashboard",
        meta: {
          title: "视频播放",
        },
        component: Dashboard,
      },
      {
        path: "resource",
        name: "Resource",
        meta: {
          title: "资源管理",
        },
        component: Resource,
      },
      {
        path: "profile",
        name: "Profile",
        meta: {
          title: "个人页",
        },
        component: Profile,
      },
      {
        path: "courseManager",
        name: "CourseManager",
        meta: {
          title: "课程管理",
        },
        component: CourseManager,
      },
      {
        path: "userManager",
        name: "UserManager",
        meta: {
          title: "用户管理",
        },
        component: UserManager,
      },
      {
        path: "chapterManager/:id",
        name: "ChapterManager",
        meta: {
          title: "章节管理",
        },
        component: ChapterManager,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
