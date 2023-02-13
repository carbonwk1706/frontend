import axios from "axios";
import router from "../router";
import store from "../store";
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    if (token|| tokenAdmin) {
      req.headers["Authorization"] = "Bearer " + token;
      req.headers["Authorization"] = "Bearer " + tokenAdmin;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (res) => {
    if (res.status === 200 || res.status === 201) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          break;
        case 401:
          alert("session expired");
          store.dispatch("auth/logout");
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        case 403:
          store.dispatch("auth/logout");
          router.replace({
            path: "/",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        case 404:
          alert("page not exist");
          break;
        case 502:
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);
export default api;
