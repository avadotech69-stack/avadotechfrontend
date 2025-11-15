import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/homepage.vue";
import AdminLayout from "../pages/AdminLayout.vue";
import BannerManager from "../components/admin/BannerManager.vue";

const routes = [
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "banners", component: BannerManager },
    ],
  },

  { path: "/", name: "Home", component: HomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
