import { getRewardList } from "@/api/reward.service.js";

const state = () => ({
  rewardList: [],
  rewardEdited: [],
  editMode: false,
});

const getters = {
  getRewardList(state) {
    return state.rewardList;
  },
  getRewardEdited(state) {
    return state.eventEdited;
  },
  getEditMode(state) {
    return state.editMode;
  },
};

const mutations = {
  setRewardList(state, rewardList) {
    state.rewardList = rewardList;
  },
  setRewardEdited(state, rewardEdited) {
    state.rewardEdited = rewardEdited;
  },
  setEditMode(state, editMode) {
    state.editMode = editMode;
  },
};

const actions = {
  async fetchRewardList({ commit }) {
    const rewardList = await getRewardList();
    commit("setRewardList", rewardList);
  },
  saveRewardEdited({ commit }, rewardEdited) {
    commit("setRewardEdited", rewardEdited);
  },
  openEditMode({ commit }) {
    commit("setEditMode", true);
  },
  closeEditMode({ commit }) {
    commit("setEditMode", false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
