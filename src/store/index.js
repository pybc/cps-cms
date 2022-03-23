import Vue from "vue";
import Vuex from "vuex";
import event from "../store/event";
import reward from "../store/reward";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { event, reward },
});
