import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // {
  //   path: "/",
  //   name: "Hello",
  //   component: () => import("../views/Hello.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  // base: process.env.BASE_URL,
  routes,
});

export default router;
