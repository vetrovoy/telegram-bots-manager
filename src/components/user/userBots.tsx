import { useState, useEffect } from "react";

import { Skeleton, Typography } from "antd";

import AddUserBotFormModal from "../modal/addUserBotFormModal";

import api from "../../api/api";
import { IBot } from "../../types/app";
import { IUser } from "../../types/app";
import BotsTable from "../bot/BotsTable";
import { setUserBots } from "../../store/app/app";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector.";

type Props = {
  user: IUser;
};

export default function UserBots({ user }: Props) {
  const dispatch = useTypedDispatch();
  const app = useTypedSelector((state) => state.app);
  const bots = app.bots;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBots() {
      if (bots.length) return;

      setIsLoading(true);
      const userBots: IBot[] = await api.getUserBotsByUserName(user.username);
      setIsLoading(false);
      dispatch(setUserBots(userBots));
    }
    fetchBots();
  }, [bots.length, dispatch, user.username]);

  return (
    <>
      {isLoading ? (
        <Skeleton
          title={{ width: "100%" }}
          paragraph={{ rows: 2, width: "100%" }}
        />
      ) : bots.length > 0 ? (
        <BotsTable bots={bots} loading={app.status === "loading-inner"} />
      ) : (
        <>
          <Typography.Text type="secondary">
            Вы ещё не создали ни одного бота
          </Typography.Text>

          <AddUserBotFormModal
            style={{ display: "block", marginTop: 30 }}
            title="Создать бота"
          />
        </>
      )}
    </>
  );
}
