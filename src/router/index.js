import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import EventView from "../views/Event/EventView.vue";
// import EventMember from "../views/Event/EventMember.vue";
import EventOther from "../views/Event/EventOther.vue";
import EventCreate from "../views/Event/EventCreate.vue";
import RewardView from "../views/Reward/RewardView.vue";
import RewardCreate from "../views/Reward/RewardCreate.vue";
import ClaimView from "../views/Claim/ClaimView.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView,
  // },
  {
    path: "/",
    name: "event",
    component: EventView,
  },
  // {
  //   path: "/event/member/:eventId",
  //   name: "eventMember",
  //   component: EventMember,
  // },
  {
    path: "/event/other/:eventId",
    name: "eventOther",
    component: EventOther,
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
    path: "/claim",
    name: "claim",
    component: ClaimView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
