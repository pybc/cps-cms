import axios from "axios";

export const createEvent = async (event) => {
  return await axios.post(`${process.env.VUE_APP_API_URL}/event/create`, event);
};

export const getEventList = async () => {
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/event`);
    return data;
  } catch (error) {
    console.log("[eventService] getEventList error ==> ", error);
  }
};

export const getEventById = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.VUE_APP_API_URL}/event/${id}`
    );
    return data;
  } catch (error) {
    console.log("[eventService] getEventById error ==> ", error);
  }
};

export const updateEvent = async (eventEdited) => {
  try {
    return await axios.patch(
      `${process.env.VUE_APP_API_URL}/event/update`,
      eventEdited
    );
  } catch (error) {
    console.log("[eventService] updateEvent error ==> ", error);
  }
};

export const multicastEvent = async (payload) => {
  try {
    return await axios.post(
      `${process.env.VUE_APP_API_URL}/event/multicast`,
      payload
    );
  } catch (error) {
    console.log("[eventService] updateEvent error ==> ", error);
  }
};
