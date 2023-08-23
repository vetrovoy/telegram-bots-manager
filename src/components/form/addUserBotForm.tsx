import { Button, Form, Input, Typography } from "antd";

import { rules } from "../../utils/rules";

import api from "../../api/api";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector.";
import { IBot } from "../../types/app";
import { botsActions } from "../../store/bots/bots";

type FieldType = {
  token?: string;
};

interface IAddUserBotForm {
  onFinish: () => void;
}

export default function AddUserBotForm({ onFinish }: IAddUserBotForm) {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user.user);
  const bots = useTypedSelector((state) => state.bots);

  const onFinishHandler = async (v: { token: string }) => {
    if (!user) return;
    dispatch(botsActions.setBotsMessage("Создание нового бота..."));
    dispatch(botsActions.setBotsStatus("loading"));

    const bot: IBot = await api.createBot(v.token, user.username);
    const isBotExist = bots.bots.find((b) => b.token === v.token);

    if (bot && !isBotExist) {
      dispatch(botsActions.setBots([...bots.bots, bot]));
      dispatch(botsActions.setBotsMessage("Бот успешно создан!"));
      dispatch(botsActions.setBotsStatus("success"));
      onFinish();
    } else {
      dispatch(
        botsActions.setBotsMessage(
          "Ошибка, бот с таким токеном уже существует!",
        ),
      );
      dispatch(botsActions.setBotsStatus("error"));
    }
  };

  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onFinishHandler}
      autoComplete="off"
    >
      <Typography.Text
        type="secondary"
        style={{ display: "inline-block", marginBottom: 20 }}
      >
        Токен - официальный адрес бота в Telegram
      </Typography.Text>

      <Form.Item<FieldType>
        label="Токен"
        name="token"
        rules={[
          rules.required(),
          rules.isValidToken(
            "Укажите корректный токен бота, например, 1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11",
          ),
        ]}
      >
        <Input />
      </Form.Item>

      <Typography.Text type="secondary">
        ⚠️ Каждый новый бот по умолчанию находится на пробном тарифе. Через 14
        дней пробный тариф будет завершён и некоторые функции могут стать
        недоступны (если количество пользователей превысит 100 человек). Чтобы
        функционал бота остался полным необходимо будет приобрести тариф Pro
      </Typography.Text>

      <Form.Item>
        <Button
          loading={bots.status === "loading"}
          type="primary"
          htmlType="submit"
          style={{ marginTop: "20px" }}
        >
          Принять
        </Button>
      </Form.Item>
    </Form>
  );
}
