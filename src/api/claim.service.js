import axios from "axios";

export const getClaimList = async () => {
  try {
    const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/claim`);
    return data;
  } catch (error) {
    console.log("[claimService] getClaimList error ==> ", error);
  }
};

export const confirmClaim = async (payload) => {
  try {
    return await axios.patch(
      `${process.env.VUE_APP_API_URL}/claim/confirm`,
      payload
    );
  } catch (error) {
    console.log("[claimService] confirmClaim error ==> ", error);
  }
};

export const cancelClaim = async (payload) => {
  try {
    return await axios.patch(
      `${process.env.VUE_APP_API_URL}/claim/cancel`,
      payload
    );
  } catch (error) {
    console.log("[claimService] cancelClaim error ==> ", error);
  }
};
