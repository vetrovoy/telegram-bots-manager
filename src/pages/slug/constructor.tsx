import { Navigate, useLocation, useParams } from "react-router-dom";

import withUserProtectedRoute from "../../components/app/route/withUserProtectedRoute";
import AppLayout, { Breadcrumbs } from "../../components/app/layout/appLayout";

import { routeNames } from "../../route/routes";

import AppSpinner from "../../components/app/layout/appSpinner";
import { useTranslate } from "../../hooks/useTranslate";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export default withUserProtectedRoute(function Constructor() {
  const constructors = useTypedSelector((state) => state.constructors);

  const location = useLocation();
  const { slug } = useParams();

  const t = useTranslate();

  if (!slug) {
    return <Navigate to={routeNames.ERROR} />;
  }

  const breadcrumbs: Breadcrumbs[] = [
    { path: routeNames.HOME, title: "Главная" },
    { path: routeNames.CONSTRUCTORS, title: "Мои сценарии" },
    { path: location.pathname, title: slug },
  ];

  function renderContent(): JSX.Element {
    if (constructors.status === "loading") {
      return <AppSpinner />;
    }

    if (
      constructors.status === "success" &&
      constructors.constructors.length !== 0
    ) {
      const constructor = constructors.constructors.find(
        (c) => c.id === parseInt(slug || ""),
      );

      if (constructor) {
        return (
          <AppLayout
            breadcrumbs={breadcrumbs}
            title={`${t("Настройки сценария")} ${slug}`}
            subtitle={t("Настройте ваш сценарий для бота")}
          ></AppLayout>
        );
      } else {
        return <Navigate to={routeNames.ERROR} />;
      }
    }

    if (
      constructors.status === "idle" &&
      constructors.constructors.length === 0
    ) {
      return <Navigate to={routeNames.ERROR} />;
    }

    return <Navigate to={routeNames.ERROR} />;
  }

  return <>{renderContent()}</>;
});
