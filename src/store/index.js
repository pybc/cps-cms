import Vue from "vue";
import Vuex from "vuex";
import event from "./modules/event";
import reward from "./modules/reward";
import claim from "./modules/claim";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { event, reward, claim },
});
