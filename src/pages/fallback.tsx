import { Link } from "react-router-dom";

import { Layout, Result } from "antd";

import { routeNames } from "../route/routes";
import { useTranslate } from "../hooks/useTranslate";

export default function Fallback() {
  const t = useTranslate();
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
        <Result
          status="404"
          title="404"
          subTitle={<>{t("Запрашиваемая страница не существует")}</>}
          extra={<Link to={routeNames.HOME}>{t("Вернуться на главную")}</Link>}
        />
      </Layout.Content>
    </Layout>
  );
}
