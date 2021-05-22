import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import Cookies from "js-cookie";
import TokenValidate from "./api/TokenValidate";
// React Redux
import allReducers from "./reducers/index";
import { createStore } from "redux";
import { Provider } from "react-redux";
import StateLoader from "./reducers/PresistedState";
const stateLoader = new StateLoader();

let store = createStore(
  allReducers,
  stateLoader.loadState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
//Request Interceptor
axios.interceptors.request.use(
  async (config) => {
    if (config.url.includes("/superuser/login")) return config;
    if (config.url.includes("/superuser/refreshToken")) return config;
    if (config.url.includes("/superuser/operator")) {
      config.headers["Content-Type"] = "application/json";
      return config;
    }
    TokenValidate();
    config.headers["Authorization"] = "Bearer " + Cookies.get("access");
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response Interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + Cookies.get("access");
      axios.defaults.headers.common["Content-Type"] = "application/json";
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
store.subscribe(() => {
  stateLoader.saveState(store.getState());
});
export const history = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
