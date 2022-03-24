import axios from "axios";

const state = () => ({
  eventList: [],
  eventEdited: [],
  editMode: false,
});
const getters = {
  getEventList(state) {
    return state.eventList;
  },
  getEventEdited(state) {
    return state.eventEdited;
  },
  getEditMode(state) {
    return state.editMode;
  },
};
const mutations = {
  setEventList(state, eventList) {
    state.eventList = eventList;
  },
  setEventEdited(state, eventEdited) {
    state.eventEdited = eventEdited;
  },
  setEditMode(state, editMode) {
    state.editMode = editMode;
  },
};
const actions = {
  async fetchEventList({ commit }) {
    try {
      const eventList = await axios.get(`${process.env.VUE_APP_API_URL}/event`);
      commit("setEventList", eventList.data);
    } catch (error) {
      console.log("[VueX] fetchEventList error ==> ", error);
    }
  },
  async sendEventEditedToDatabase({ commit }, eventEdited) {
    try {
      const res = await axios.patch(
        `${process.env.VUE_APP_API_URL}/event/update`,
        eventEdited
      );
      commit("setEventEdited", eventEdited);
      console.log("res", res);
    } catch (error) {
      console.log("[VueX] sendEventEditedToDatabase error ==> ", error);
    }
  },
  saveEventEdited({ commit }, eventEdited) {
    commit("setEventEdited", eventEdited);
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
