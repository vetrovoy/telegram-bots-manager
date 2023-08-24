import { Card, Tooltip, Typography } from "antd";

import AccountLayout from "../components/common/layout/accountLayout";

import { routeNames } from "../route/routes";
import { IUser } from "../types/app";

import UserBots from "../components/user/userBots";
import withUserProtectedRoute from "../components/route/withUserProtectedRoute";
import { useTranslate } from "../hooks/useTranslate";

interface IDashboard {
  user: IUser;
}

export default withUserProtectedRoute(function Dashboard({ user }: IDashboard) {
  const t = useTranslate();

  return (
    <AccountLayout
      path={routeNames.DASHBOARD}
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
        style={{ width: "100%" }}
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
        style={{ width: "100%", marginTop: "34px" }}
      >
        <Typography.Text type="secondary">
          {t("Вам не предоставлен доступ ни к одному боту")}
        </Typography.Text>
      </Card>
    </AccountLayout>
  );
});
