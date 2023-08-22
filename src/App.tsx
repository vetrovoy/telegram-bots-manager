import { useEffect } from "react";

import { routes } from "./route/routes";
import { Route, Routes } from "react-router-dom";

import { Layout, message } from "antd";
import { useTypedSelector } from "./hooks/useTypedSelector.";

export default function App() {
  const app = useTypedSelector((state) => state.app);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (
      app.status === "success" ||
      app.status === "error" ||
      app.status === "loading" ||
      app.status === "loading-inner"
    ) {
      messageApi.open({
        type: app.status === "loading-inner" ? "loading" : app.status,
        content: app.message,
      });
    }
  }, [app.status]);

  return (
    <>
      {contextHolder}
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
