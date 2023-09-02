import { Link } from "react-router-dom";

import { Layout, Result } from "antd";

import { routeNames } from "../route/routes";
import { useTranslate } from "../hooks/useTranslate";

import style from "./style/fallback.module.css";

export default function Fallback() {
  const t = useTranslate();
  return (
    <Layout>
      <Layout.Content className={style.content}>
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
