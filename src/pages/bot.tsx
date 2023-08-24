import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

import { IBot, IUser } from "../types/app";
import withUserProtectedRoute from "../components/route/withUserProtectedRoute";
import AccountLayout, {
  Breadcrumbs,
} from "../components/common/layout/accountLayout";

import { Api } from "../api/api";
import { routeNames } from "../route/routes";

import AppSpin from "../components/common/appSpin";
import BotsTable from "../components/bot/BotsTable";
import { useTypedDispatch, useTypedSelector } from "../hooks/useTypedSelector";
import { botsActions } from "../store/bots/bots";
import { useTranslate } from "../hooks/useTranslate";

type Props = {
  user: IUser;
};

const api = new Api();

export default withUserProtectedRoute(function Bot({ user }: Props) {
  const location = useLocation();
  const { slug } = useParams();
  const dispatch = useTypedDispatch();

  const t = useTranslate();
  const bots = useTypedSelector((state) => state.bots);

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [bot, setBot] = useState<IBot | null>(null);

  useEffect(() => {
    async function fetchBot() {
      setStatus("loading");

      try {
        let currentBots: IBot[];

        if (bots.bots.length > 0) {
          currentBots = bots.bots;
        } else {
          currentBots = await api.getUserBotsByUserName(user.username);
          dispatch(botsActions.setBots(currentBots));
        }

        const selectedBot = currentBots.find((b) => b.bot_username === slug);

        if (selectedBot) {
          setBot(selectedBot);
        }
      } catch (error) {
        setStatus("error");
        console.log(error);
      }

      setStatus("success");
    }
    fetchBot();
  }, [bots.bots, dispatch, slug, user.username]);

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
          <BotsTable loading={bots.status === "loading"} bots={[bot]} />
        </AccountLayout>
      );
    }

    return <Navigate to={routeNames.ERROR} />;
  }

  return <>{renderContent()}</>;
});
