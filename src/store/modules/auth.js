const state = () => ({
  userProfile: "",
});
const getters = {
  getUserProfile(state) {
    return state.userProfile;
  },
};
const mutations = {
  setUserProfile(state, userProfile) {
    state.userProfile = userProfile;
  },
};
const actions = {
  async initProfile({ commit }, profile) {
    try {
      commit("setUserProfile", profile);
      console.log("profile", profile);
    } catch (error) {
      console.log("[VueX] initProfile error ==> ", error);
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
