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
  req => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.common.Authorization = "Bearer " + token;
    }
    return req;
  },
  error => {
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
          console.log("Status 400");
          break;
        case 401:
          alert("session expired");
          store.dispatch("auth/login")
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        case 403:
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        case 404:
          console.log("page not exist");
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
