import { useEffect, useState } from "react";

import api from "../api/api";

import { IBot, IUser } from "../types/app";

import { botsActions } from "../store/bots/bots";

import { useTypedDispatch, useTypedSelector } from "./useTypedSelector";

interface IUseFetchBot {
  status: "loading" | "success" | "error";
  bot: IBot | null;
}

export const useFetchBot = (
  botUsername: string | undefined,
  userId: IUser["id"],
): IUseFetchBot => {
  const dispatch = useTypedDispatch();
  const bots = useTypedSelector((state) => state.bots);

  const [status, setStatus] = useState<IUseFetchBot["status"]>("loading");
  const [bot, setBot] = useState<IBot | null>(null);

  useEffect(() => {
    async function fetchBot() {
      setStatus("loading");

      try {
        let currentBots = bots.bots;

        if (currentBots.length === 0) {
          currentBots = await api.getBotsByUserId(userId);
          dispatch(botsActions.setBots(currentBots));
        }

        const selectedBot = currentBots.find(
          (b) => b.bot_username === botUsername,
        );

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
  }, [botUsername, userId]);

  if (!botUsername) return { status, bot };

  return { status, bot };
};
