import { Navigate, useLocation, useParams } from "react-router-dom";

import { IUser } from "../types/app";
import withUserProtectedRoute from "../components/route/withUserProtectedRoute";
import AccountLayout, {
  Breadcrumbs,
} from "../components/common/layout/accountLayout";

import { routeNames } from "../route/routes";

import AppSpin from "../components/common/appSpin";
import { useTranslate } from "../hooks/useTranslate";
import { useFetchBot } from "../hooks/useFetchBot";
import { useTypedSelector } from "../hooks/useTypedSelector";
import BotConstructor from "../components/bot/constructor/botConstructor";

type Props = {
  user: IUser;
};

export default withUserProtectedRoute(function Bot({ user }: Props) {
  const location = useLocation();
  const { slug } = useParams();
  const bots = useTypedSelector((state) => state.bots);
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
      return <AppSpin />;
    }

    if (bot && status === "success") {
      return (
        <AccountLayout
          breadcrumbs={breadcrumbs}
          title={`${t("Общие настройки бота")} ${slug}`}
          subtitle={t("Настройте вашего бота и зарабатывайте больше")}
        >
          {/* <BotsTable loading={bots.status === "loading"} bots={[bot]} /> */}

          <BotConstructor bot={bot} />
        </AccountLayout>
      );
    }

    return <Navigate to={routeNames.ERROR} />;
  }

  return <>{renderContent()}</>;
});
