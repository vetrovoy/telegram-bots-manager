import { useMemo } from "react";

import { Menu, MenuProps } from "antd";
import {
  DeleteOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { routeNames } from "../../../route/routes";
import { IBot } from "../../../types/app";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../../hooks/useTypedSelector";
import { botsActions } from "../../../store/bots/bots";
import { useTranslate } from "../../../hooks/useTranslate";

type BotPopoverMenuProps = {
  bot: IBot;
};

export default function BotPopoverMenu({ bot }: BotPopoverMenuProps) {
  const t = useTranslate();
  const bots = useTypedSelector((state) => state.bots.bots);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const headerMenuRoutes: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: `${routeNames.DASHBOARD}/${bot.bot_username}`,
        label: t("Настройки"),
        icon: <SettingOutlined />,
      },
      {
        key: bot.status === "processing" ? "OFF" : "ON",
        label: bot.status === "processing" ? t("Выключить") : t("Включить"),
        icon: (
          <PoweroffOutlined
            style={{ color: bot.status === "processing" ? "red" : "green" }}
          />
        ),
      },
      {
        key: "DELETE",
        label: t("Удалить"),
        icon: <DeleteOutlined style={{ color: "red" }} />,
      },
    ];
  }, [bot.id, bot.status]);

  const handleMenuItemClick = (v: { key: string }) => {
    switch (v.key) {
      case "DELETE":
        deleteBot();
        break;
      case "OFF":
        toggleBot();
        break;
      case "ON":
        toggleBot();
        break;
      default:
        navigate(v.key);
        break;
    }
  };

  async function deleteBot() {
    dispatch(botsActions.setBotsMessage(t("Удаление...")));
    dispatch(botsActions.setBotsStatus("loading"));

    setTimeout(() => {
      const filtred = bots.filter((b) => b.token !== bot.token);
      dispatch(botsActions.setBots(filtred));
      dispatch(
        botsActions.setBotsMessage(
          `${t("Бот с именем")} ${bot.bot_name} ${t("удален!")}`,
        ),
      );
      dispatch(botsActions.setBotsStatus("success"));
    }, 1000);
  }

  async function toggleBot() {
    dispatch(botsActions.setBotsMessage("Загрузка..."));
    dispatch(botsActions.setBotsStatus("loading"));

    setTimeout(() => {
      const newBots = bots.filter((b) => b.token !== bot.token);
      const curBot: IBot | undefined = bots.find((b) => b.token === bot.token);

      if (!curBot) return;

      if (curBot?.status === "processing") {
        const newBot: IBot = { ...curBot, status: "default" };
        dispatch(
          botsActions.setBotsMessage(
            `${t("Бот с именем")} ${newBot.bot_name} ${t("выключен!")}`,
          ),
        );
        newBots.push(newBot);
      } else {
        const newBot: IBot = { ...curBot, status: "processing" };
        dispatch(
          botsActions.setBotsMessage(
            `${t("Бот с именем")} ${newBot.bot_name} ${t("включен!")}`,
          ),
        );
        newBots.push(newBot);
      }

      dispatch(botsActions.setBots(newBots));
      dispatch(botsActions.setBotsStatus("success"));
    }, 1000);
  }

  return (
    <Menu
      mode="vertical"
      onClick={handleMenuItemClick}
      items={headerMenuRoutes}
    />
  );
}
