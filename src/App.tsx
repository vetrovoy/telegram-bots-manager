import { Route, Routes } from "react-router-dom";

import { Layout } from "antd";

import { routes } from "./route/routes";
import MessagesHolder from "./components/common/messagesHolder";

export default function App() {
  return (
    <>
      <MessagesHolder />
      <Layout style={{ minHeight: "100vh" }}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </Layout>
    </>
  );
}
