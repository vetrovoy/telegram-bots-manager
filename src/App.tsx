import { useEffect } from "react";

import { routes } from "./route/routes";
import { Route, Routes } from "react-router-dom";

import { Layout, message } from "antd";
import { useTypedSelector } from "./hooks/useTypedSelector.";

export default function App() {
  const user = useTypedSelector((state) => state.user);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (
      user.status === "error" ||
      user.status === "loading"
    ) {
      messageApi.open({
        type: user.status,
        content: user.message,
      });
    }
  }, [user.status]);

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
