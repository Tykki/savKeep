import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing,
    },
    {
      path: "/:id",
      name: "tasks",
      component: Landing,
    },
    {
      path: "/user/:id",
      name: "userTasks",
      component: Landing,
    },
    {
      // path: "/about",
      // name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
