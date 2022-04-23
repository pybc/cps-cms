import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import EventView from "../views/Event/EventView.vue";
// import EventMember from "../views/Event/EventMember.vue";
import EventOther from "../views/Event/EventOther.vue";
import EventCreate from "../views/Event/EventCreate.vue";
import RewardView from "../views/Reward/RewardView.vue";
import RewardCreate from "../views/Reward/RewardCreate.vue";
import ClaimView from "../views/Claim/ClaimView.vue";
// import auth from "@/store/modules/auth";
// import { store } from "@/store";

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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/event/other/:eventId",
    name: "eventOther",
    component: EventOther,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/event/create",
    name: "eventCreate",
    component: EventCreate,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/reward",
    name: "reward",
    component: RewardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/reward/create",
    name: "rewardCreate",
    component: RewardCreate,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/claim",
    name: "claim",
    component: ClaimView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!auth.state.userProfile) {
//       next({
//         path: "/home",
//         query: { redirect: to.fullPath },
//       });
//     } else {
//       next();
//     }
//   } else {
//     next(); // make sure to always call next()!
//   }
// });

export default router;
