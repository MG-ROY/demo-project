import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // {
  //     name: 'Home',
  //     path: '/home',
  //     component: () => import('../views/home/index.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
