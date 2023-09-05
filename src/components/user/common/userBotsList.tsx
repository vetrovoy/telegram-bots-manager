import { Typography } from "antd";

import AddUserBotFormModal from "../modal/add/addUserBotFormModal";

import BotsList from "../../bot/common/botsList";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useTranslate } from "../../../hooks/useTranslate";

import style from "./style/userBotsList.module.css";

export default function UserBotsList() {
  const t = useTranslate();
  const bots = useTypedSelector((state) => state.bots);

  return (
    <>
      {bots.status === "loading" ? (
        <BotsList loading={bots.status === "loading"} bots={bots.bots} />
      ) : bots.bots.length > 0 ? (
        <BotsList bots={bots.bots} />
      ) : (
        <>
          <Typography.Text type="secondary">
            {t("Вы ещё не создали ни одного бота")}
          </Typography.Text>

          <AddUserBotFormModal
            className={style.form}
            title={t("Создать бота")}
          />
        </>
      )}
    </>
  );
}
