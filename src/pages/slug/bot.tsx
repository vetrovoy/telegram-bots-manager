import { Navigate, useLocation, useParams } from "react-router-dom";

import withUserProtectedRoute from "../../components/app/route/withUserProtectedRoute";
import AppLayout, { Breadcrumbs } from "../../components/app/layout/appLayout";

import { routeNames } from "../../route/routes";

import AppSpinner from "../../components/app/layout/appSpinner";
import { useTranslate } from "../../hooks/useTranslate";
import ConstructorForm from "../../components/constructor/common/constructorForm";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export default withUserProtectedRoute(function Bot() {
  const bots = useTypedSelector((state) => state.bots);

  const location = useLocation();
  const { slug } = useParams();

  const t = useTranslate();

  if (!slug) {
    return <Navigate to={routeNames.ERROR} />;
  }

  const breadcrumbs: Breadcrumbs[] = [
    { path: routeNames.HOME, title: "Главная" },
    { path: routeNames.DASHBOARD, title: "Мои боты" },
    { path: location.pathname, title: slug },
  ];

  function renderContent(): JSX.Element {
    if (bots.status === "loading") {
      return <AppSpinner />;
    }

    if (bots.status === "success" && bots.bots.length !== 0) {
      const bot = bots.bots.find((b) => b.bot_username === slug);

      if (bot) {
        return (
          <AppLayout
            breadcrumbs={breadcrumbs}
            title={`${t("Общие настройки бота")} ${slug}`}
            subtitle={t("Настройте вашего бота и зарабатывайте больше")}
          >
            {/* <BotsTable loading={bots.status === "loading"} bots={[bot]} /> */}

            <ConstructorForm bot={bot} />
          </AppLayout>
        );
      } else {
        return <Navigate to={routeNames.ERROR} />;
      }
    }

    if (bots.status === "idle" && bots.bots.length === 0) {
      return <Navigate to={routeNames.ERROR} />;
    }

    return <Navigate to={routeNames.ERROR} />;
  }

  return <>{renderContent()}</>;
});
