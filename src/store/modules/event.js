import { getEventList, updateEvent } from "@/api/event.service.js";

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
      const eventList = await getEventList();
      commit("setEventList", eventList);
    } catch (error) {
      console.log("[VueX] fetchEventList error ==> ", error);
    }
  },

  async sendEventEditedToDatabase({ commit }, eventEdited) {
    try {
      const { status } = await updateEvent(eventEdited);
      commit("setEventEdited", eventEdited);
      return status === 200 ? true : false;
    } catch (error) {
      console.log("[VueX] sendEventEditedToDatabase error ==> ", error);
      return false;
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
