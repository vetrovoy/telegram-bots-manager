import { Navigate, useLocation, useParams } from "react-router-dom";

import { IUser } from "../types/app";
import withUserProtectedRoute from "../components/app/route/withUserProtectedRoute";
import AppLayout, { Breadcrumbs } from "../components/app/layout/appLayout";

import { routeNames } from "../route/routes";

import AppSpinner from "../components/app/layout/appSpinner";
import { useTranslate } from "../hooks/useTranslate";
import { useFetchBot } from "../hooks/useFetchBot";
import BotConstructor from "../components/bot/constructor/botConstructor";

type BotProps = {
  user: IUser;
};

export default withUserProtectedRoute(function Bot({ user }: BotProps) {
  const location = useLocation();
  const { slug } = useParams();
  const { bot, status } = useFetchBot(slug, user.username);
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
    if (status === "loading") {
      return <AppSpinner />;
    }

    if (bot && status === "success") {
      return (
        <AppLayout
          breadcrumbs={breadcrumbs}
          title={`${t("Общие настройки бота")} ${slug}`}
          subtitle={t("Настройте вашего бота и зарабатывайте больше")}
        >
          {/* <BotsTable loading={bots.status === "loading"} bots={[bot]} /> */}

          <BotConstructor bot={bot} />
        </AppLayout>
      );
    }

    return <Navigate to={routeNames.ERROR} />;
  }

  return <>{renderContent()}</>;
});
