// import Config from '~/config'
import liff from "@line/liff";
class LineUtil {
  init() {
    console.log("LIFF INIT Starting");
    console.log(`LINE_LIFF_ID : ${process.env.VUE_APP_LINE_LIFF_ID}`);
    return liff
      .init({
        liffId: `${process.env.VUE_APP_LINE_LIFF_ID}`,
      })
      .then(() => {
        console.log("LIFF INIT Success");
      })
      .catch((err) => {
        console.log("Init error", err);
      });
  }

  login() {
    console.log("LIFF Ready Starting");
    liff.ready
      .then(async () => {
        console.log("LIFF isLoggedIn Starting");
        if (liff.isLoggedIn()) {
          const decodedIDToken = await this.getDecodedIDToken();
          localStorage.setItem(
            `LIFF_STORE:${process.env.VUE_APP_LINE_LIFF_ID}:decodedIDToken`,
            decodedIDToken
          );
        } else {
          console.log("LIFF Login & redirectUri Starting");
          liff
            .login({
              redirectUri: window.location,
            })
            .then(() => {
              console.log(`LIFF Login Success`);
            })
            .catch((err) => {
              console.log("Login error", err);
            });
        }
      })
      .catch((err) => {
        console.log("Login error", err);
      });
  }

  async getProfile() {
    const lineProfile = await liff.getProfile();
    return lineProfile;
  }

  async getIDToken() {
    return await liff.getIDToken();
  }

  async getDecodedIDToken() {
    return await liff.getDecodedIDToken();
  }
}

const lineUtil = new LineUtil();
export default lineUtil;
