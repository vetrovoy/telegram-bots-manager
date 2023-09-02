import { Card, Tooltip, Typography } from "antd";

import AccountLayout, {
  Breadcrumbs,
} from "../components/common/layout/accountLayout";

import { routeNames } from "../route/routes";
import { IUser } from "../types/app";

import UserBots from "../components/user/userBots";
import withUserProtectedRoute from "../components/route/withUserProtectedRoute";
import { useTranslate } from "../hooks/useTranslate";

import style from "./style/dashboard.module.css";

type DashboardProps = {
  user: IUser;
};

export default withUserProtectedRoute(function Dashboard({
  user,
}: DashboardProps) {
  const t = useTranslate();

  const breadcrumbs: Breadcrumbs[] = [
    { path: routeNames.HOME, title: "Главная" },
    { path: routeNames.DASHBOARD, title: "Мои боты" },
  ];

  return (
    <AccountLayout
      breadcrumbs={breadcrumbs}
      title={t("Мои боты")}
      subtitle={t("Управляйте всеми ботами из этой панели")}
    >
      <Card
        title={t("Список моих ботов")}
        extra={
          <Tooltip
            title={t(
              "В данном меню отображается список всех ваших чат-ботов, которыми вы можете управлять",
            )}
          >
            <Typography.Link>{t("Подробнее")}</Typography.Link>
          </Tooltip>
        }
        className={style.topCard}
      >
        <UserBots user={user} />
      </Card>

      <Card
        title={t("Общие боты")}
        extra={
          <Tooltip title={t("Список ботов, к которым вам предоставили доступ")}>
            <Typography.Link>{t("Подробнее")}</Typography.Link>
          </Tooltip>
        }
        className={style.botCard}
      >
        <Typography.Text type="secondary">
          {t("Вам не предоставлен доступ ни к одному боту")}
        </Typography.Text>
      </Card>
    </AccountLayout>
  );
});
