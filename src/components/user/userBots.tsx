import { useEffect } from "react";

import { Skeleton, Typography } from "antd";

import AddUserBotFormModal from "../modal/addUserBotFormModal";

import { IUser } from "../../types/app";
import BotsTable from "../bot/BotsTable";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector.";
import botsAsyncActions from "../../store/bots/bots-async-actions";

type Props = {
  user: IUser;
};

export default function UserBots({ user }: Props) {
  const dispatch = useTypedDispatch();
  const bots = useTypedSelector((state) => state.bots);

  useEffect(() => {
    if (bots.bots.length) return;
    dispatch(botsAsyncActions.getBots(user));
  }, []);

  return (
    <>
      {bots.status === "loading" ? (
        <BotsTable loading={bots.status === "loading"} bots={bots.bots} />
      ) : bots.bots.length > 0 ? (
        <BotsTable bots={bots.bots} />
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
