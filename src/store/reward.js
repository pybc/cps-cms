import axios from "axios";

const state = () => ({
  rewardList: [],
});

const getters = {
  getRewardList(state) {
    return state.rewardList;
  },
};

const mutations = {
  setRewardList(state, rewardList) {
    state.rewardList = rewardList;
  },
};

const actions = {
  async fetchRewardList({ commit }) {
    const rewardList = await axios.get(`${process.env.VUE_APP_API_URL}/item`);
    commit("setRewardList", rewardList.data);
    console.log("rewardList", rewardList.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
