import { Route, Routes } from "react-router-dom";

import { Layout } from "antd";

import { routes } from "./route/routes";
import AppMessagesHolder from "./components/app/layout/appMessagesHolder";

import style from "./app.module.css";

export default function App() {
  return (
    <>
      <AppMessagesHolder />
      <Layout className={style.layout}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </Layout>
    </>
  );
}
