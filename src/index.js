import React from "react";
import ReactDOM from "react-dom/client";
import "styles/Global.css";
import "styles/Helper.css";
import router from "./router";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store/store";
import Loader from "portals/loader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Loader/>
  </Provider>
);
reportWebVitals();
