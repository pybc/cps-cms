import axios from "axios";

const state = () => ({
  rewardList: [],
  rewardDelete: null,
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
  setDeleteReward(state, deleteReward) {
    state.rewardDelete = deleteReward;
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
    const rewardList = await axios.get(`${process.env.VUE_APP_API_URL}/item`);
    commit("setRewardList", rewardList.data);
    console.log("rewardList", rewardList.data);
  },
  async deleteReward({ commit }, itemID) {
    console.log(`${itemID}`);
    const deleteReward = await axios.delete(
      `${process.env.VUE_APP_API_URL}/item/delete/${itemID}`
    );
    console.log("deleteReward : ", deleteReward);
    commit("setDeleteReward", deleteReward);
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
