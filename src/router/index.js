import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventView from "../views/Event/EventView.vue";
import EventCreate from "../views/Event/EventCreate.vue";
import RewardView from "../views/Reward/RewardView.vue";
import RewardCreate from "../views/Reward/RewardCreate.vue";
import AchievementView from "../views/AchievementView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/event",
    name: "event",
    component: EventView,
  },
  {
    path: "/event/create",
    name: "eventCreate",
    component: EventCreate,
  },
  {
    path: "/reward",
    name: "reward",
    component: RewardView,
  },
  {
    path: "/reward/create",
    name: "rewardCreate",
    component: RewardCreate,
  },
  {
    path: "/achievement",
    name: "achievement",
    component: AchievementView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
