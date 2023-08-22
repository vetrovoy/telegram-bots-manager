import { Link } from "react-router-dom";

import { Layout, Typography } from "antd";

import { routeNames } from "../route/routes";

export default function Fallback() {
  return (
    <Layout>
      <Layout.Content
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 16px",
        }}
      >
        <Typography.Title>
          Страница найдена или у вас нет разрешения
        </Typography.Title>
        <Typography.Title>
          <Typography.Link style={{ fontSize: 26 }}>
            <Link to={routeNames.HOME}>Перейти на главную</Link>
          </Typography.Link>
        </Typography.Title>
      </Layout.Content>
    </Layout>
  );
}
