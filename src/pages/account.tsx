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
import { useTranslate } from "../hooks/useTranslate";

interface IAccount {
  user: IUser;
}

export default withUserProtectedRoute(function Account({ user }: IAccount) {
  const t = useTranslate();
  return (
    <>
      <AccountLayout
        path={routeNames.ACCOUNT}
        title={t("Личный кабинет")}
        subtitle={t("Управляйте своим аккаунтом из этой панели")}
      >
        <Row gutter={16}>
          <Col span={12} style={{ marginBottom: 16 }}>
            <Card
              title={t("Основные сведения профиля")}
              bordered={false}
              extra={<RemoveUserModal username={user.username} />}
            >
              <UserInformation username={user.username} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t("Изменить логин")} bordered={false}>
              <EditUserUsername username={user.username} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t("Изменить пароль")} bordered={false}>
              <EditUserPassword user={user} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t("Язык")} bordered={false}>
              <EditUserLanguage user={user} />
            </Card>
          </Col>
        </Row>
      </AccountLayout>
    </>
  );
});
