import { useMemo } from "react";
import { IBot } from "../../types/app";
import { Menu, MenuProps } from "antd";
import {
  DeleteOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { routeNames } from "../../route/routes";
import { useNavigate } from "react-router-dom";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector.";
import {
  setUserBots,
  setUserMessage,
  setUserStatus,
} from "../../store/app/app";

type Props = {
  bot: IBot;
};

export default function BotPopoverSettings({ bot }: Props) {
  const bots = useTypedSelector((state) => state.app.bots);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const headerMenuRoutes: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: `${routeNames.ACCOUNT}/${bot.id}`,
        label: "Настройки",
        icon: <SettingOutlined />,
      },
      {
        key: bot.status === "processing" ? "OFF" : "ON",
        label: bot.status === "processing" ? "Выключить" : "Включить",
        icon: (
          <PoweroffOutlined
            style={{ color: bot.status === "processing" ? "red" : "green" }}
          />
        ),
      },
      {
        key: "DELETE",
        label: "Удалить",
        icon: <DeleteOutlined style={{ color: "red" }} />,
      },
    ];
  }, []);

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
    dispatch(setUserMessage("Удаление..."));
    dispatch(setUserStatus("loading-inner"));

    setTimeout(() => {
      const filtred = bots.filter((b) => b.token !== bot.token);
      console.log(bots, bot.token);
      dispatch(setUserBots(filtred));
      dispatch(setUserStatus("success"));
    }, 1000);
  }

  async function toggleBot() {
    dispatch(setUserMessage("Загрузка..."));
    dispatch(setUserStatus("loading-inner"));

    setTimeout(() => {
      const newBots = bots.filter((b) => b.token !== bot.token);
      const curBot: IBot | undefined = bots.find((b) => b.token === bot.token);

      if (!curBot) return;

      if (curBot?.status === "processing") {
        const newBot: IBot = { ...curBot, status: "default" };
        newBots.push(newBot);
      } else {
        const newBot: IBot = { ...curBot, status: "processing" };
        newBots.push(newBot);
      }

      dispatch(setUserBots(newBots));
      dispatch(setUserStatus("success"));
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
