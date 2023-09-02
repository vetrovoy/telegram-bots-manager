import { Card, Col, Row } from "antd";

import AppLayout, { Breadcrumbs } from "../components/app/layout/appLayout";

import { routeNames } from "../route/routes";
import EditUserUsername from "../components/user/form/edit/editUserUsername";
import UserInformation from "../components/user/common/userInformation";
import EditUserPassword from "../components/user/form/edit/editUserPassword";
import EditUserLanguage from "../components/user/form/edit/editUserLanguage";
import { IUser } from "../types/app";
import DeleteUserModal from "../components/user/modal/delete/deleteUserModal";
import withUserProtectedRoute from "../components/app/route/withUserProtectedRoute";
import { useTranslate } from "../hooks/useTranslate";

import style from "./style/account.tsx.module.css";

type AccountProps = {
  user: IUser;
};

export default withUserProtectedRoute(function Account({ user }: AccountProps) {
  const t = useTranslate();

  const breadcrumbs: Breadcrumbs[] = [
    { path: routeNames.HOME, title: "Главная" },
    { path: routeNames.ACCOUNT, title: "Аккаунт" },
  ];

  return (
    <>
      <AppLayout
        breadcrumbs={breadcrumbs}
        title={t("Личный кабинет")}
        subtitle={t("Управляйте своим аккаунтом из этой панели")}
      >
        <Row gutter={16}>
          <Col span={12} className={style.col}>
            <Card
              title={t("Основные сведения профиля")}
              bordered={false}
              extra={<DeleteUserModal username={user.username} />}
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
      </AppLayout>
    </>
  );
});
