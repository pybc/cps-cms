import axios from "axios";

export const createReward = async (item) => {
  return await axios.post(`${process.env.VUE_APP_API_URL}/item/create`, item);
};

export const deleteReward = async (rewardId) => {
  return await axios.delete(
    `${process.env.VUE_APP_API_URL}/item/delete/${rewardId}`
  );
};

export const getRewardList = async () => {
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/item`);
    return data;
  } catch (error) {
    console.log("[rewardService] getRewardList error ==> ", error);
  }
};
