import { Card, Tooltip, Typography } from "antd";

import AppLayout, { Breadcrumbs } from "../components/app/layout/appLayout";

import { routeNames } from "../route/routes";
import { IUser } from "../types/app";

import withUserProtectedRoute from "../components/app/route/withUserProtectedRoute";
import { useTranslate } from "../hooks/useTranslate";
import ConstructorEmpty from "../components/constructor/common/constructorEmpty";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ConstructorsList from "../components/constructor/common/constructorsList";

// import style from "./style/Constructor.module.css";

type ConstructorProps = {
  user: IUser;
};

export default withUserProtectedRoute(function Constructors({
  user,
}: ConstructorProps) {
  const constructors = useTypedSelector(
    (state) => state.constructors.constructors,
  );
  const t = useTranslate();

  const breadcrumbs: Breadcrumbs[] = [
    { path: routeNames.HOME, title: "Главная" },
    { path: routeNames.CONSTRUCTORS, title: "Мои сценарии" },
  ];

  return (
    <AppLayout
      breadcrumbs={breadcrumbs}
      title={t("Мои сценарии")}
      subtitle={t("Управляйте всеми сценариями ботов из этой панели")}
    >
      {constructors ? (
        <ConstructorsList list={constructors} />
      ) : (
        <ConstructorEmpty />
      )}
    </AppLayout>
  );
});
