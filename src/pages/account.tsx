import { Card, Col, Row } from "antd";

import AccountLayout from "../components/common/layout/accountLayout";

import { routeNames } from "../route/routes";
import EditUserUsername from "../components/form/editUserUsername";
import UserInformation from "../components/user/userInformation";
import EditUserPassword from "../components/form/editUserPassword";
import EditUserLanguage from "../components/form/editUserLanguage";
import { IUser } from "../types/app";
import RemoveUserModal from "../components/modal/removeUserModal";
import withUserProtectedRoute from "../components/route/withUserProtectedRoute";

interface IAccount {
  user: IUser;
}

export default withUserProtectedRoute(function Account({ user }: IAccount) {
  return (
    <>
      <AccountLayout
        path={routeNames.ACCOUNT}
        title="Личный кабинет"
        subtitle="Управляйте своим аккаунтом из этой панели"
      >
        <Row gutter={16}>
          <Col span={12} style={{ marginBottom: 16 }}>
            <Card
              title="Основные сведения профиля"
              bordered={false}
              extra={<RemoveUserModal username={user.username} />}
            >
              <UserInformation username={user.username} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Изменить логин" bordered={false}>
              <EditUserUsername username={user.username} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Изменить пароль" bordered={false}>
              <EditUserPassword user={user} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Язык" bordered={false}>
              <EditUserLanguage username={user.username} />
            </Card>
          </Col>
        </Row>
      </AccountLayout>
    </>
  );
});
