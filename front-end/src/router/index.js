import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Listagem from "../views/Listagem.vue";
import Carros from "../views/Carros.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/carros",
    name: "Carros",
    component: Carros,
  },
  {
    path: "/listagem",
    name: "Listagem",
    component: Listagem,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
