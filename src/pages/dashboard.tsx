import { Card, Tooltip, Typography } from "antd";

import AccountLayout from "../components/common/layout/accountLayout";

import { routeNames } from "../route/routes";
import withFetchUser from "../components/route/withFetchUser";
import { IUser } from "../types/app";

import UserBots from "../components/user/userBots";

interface IDashboard {
  user: IUser;
}

function DashboardPage({ user }: IDashboard) {
  return (
    <AccountLayout
      path={routeNames.DASHBOARD}
      title="Мои боты"
      subtitle="Управляйте всеми ботами из этой панели"
    >
      <Card
        title="Список моих ботов"
        extra={
          <Tooltip
            title="В данном меню отображается список всех ваших чат-ботов,
                  которыми вы можете управлять"
          >
            <Typography.Link>Подробнее</Typography.Link>
          </Tooltip>
        }
        style={{ width: "100%" }}
      >
        <UserBots user={user} />
      </Card>

      <Card
        title="Общие боты"
        extra={
          <Tooltip title="Список ботов, к которым вам предоставили доступ">
            <Typography.Link>Подробнее</Typography.Link>
          </Tooltip>
        }
        style={{ width: "100%", marginTop: "34px" }}
      >
        <Typography.Text type="secondary">
          Вам не предоставлен доступ ни к одному боту
        </Typography.Text>
      </Card>
    </AccountLayout>
  );
}

const Dashboard = withFetchUser(DashboardPage);

export default Dashboard;