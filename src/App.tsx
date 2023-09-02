import { Route, Routes } from "react-router-dom";

import { Layout } from "antd";

import { routes } from "./route/routes";
import MessagesHolder from "./components/common/layout/messagesHolder";

import style from "./app.module.css";

export default function App() {
  return (
    <>
      <MessagesHolder />
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
