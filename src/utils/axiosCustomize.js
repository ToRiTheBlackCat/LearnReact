import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 50,
});
const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    //Get token from redux store
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`;

    //Loading progress bar
    NProgress.start();
    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    NProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    //Token expired EC = -999 or invalid, call refresh token API
    if (error.response.data && error.response.data.EC === -999) {
      //Call refresh token API
      const email = store?.getState()?.user?.account?.email;
      const refreshToken = store?.getState()?.user?.account?.refresh_token;

      let res = instance.post("/api/refresh-token", {
        email: email,
        refreshToken: refreshToken,
      });
      return res
        .then((newTokenData) => {
          {
            if (newTokenData && newTokenData.EC === 0) {
              //Update new token to redux
              const userAccount = store?.getState()?.user?.account;
              const updatedAccount = {
                ...userAccount,
                access_token: newTokenData.DT.access_token,
                refresh_token: newTokenData.DT.refresh_token,
              };
              store.dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: { account: updatedAccount },
              });
            }
          }
        })
        .then(() => {
          //Retry the original request
          const config = error.config;
          const access_token = store?.getState()?.user?.account?.access_token;
          config.headers["Authorization"] = `Bearer ${access_token}`;
          return instance.request(config);
        });
    }

    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
