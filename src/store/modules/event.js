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
    const eventList = await axios.get(`${process.env.VUE_APP_API_URL}/event`);
    commit("setEventList", eventList.data);
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
