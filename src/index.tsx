import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store/store";

import App from "./App";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import { routeNames } from "./route/routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={
          {
            // algorithm: theme.darkAlgorithm,
          }
        }
      >
        <BrowserRouter basename={routeNames.HOME}>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
