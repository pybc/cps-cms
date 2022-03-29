import { getClaimList } from "@/api/claim.service.js";

const state = () => ({
  claimList: [],
});
const getters = {
  getClaimList(state) {
    return state.claimList;
  },
};
const mutations = {
  setClaimList(state, claimList) {
    state.claimList = claimList;
  },
};
const actions = {
  async fetchClaimList({ commit }) {
    try {
      const claimList = await getClaimList();
      commit("setClaimList", claimList);
    } catch (error) {
      console.log("[VueX] fetchClaimList error ==> ", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
