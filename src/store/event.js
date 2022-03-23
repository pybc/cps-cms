import axios from "axios";

const state = () => ({
  eventList: [],
});
const getters = {
  getEventList(state) {
    return state.eventList;
  },
};
const mutations = {
  setEventList(state, eventList) {
    state.eventList = eventList;
  },
};

const actions = {
  async fetchEventList({ commit }) {
    const eventList = await axios.get(`${process.env.VUE_APP_API_URL}/event`);
    commit("setEventList", eventList.data);
    console.log("eventList", eventList);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
