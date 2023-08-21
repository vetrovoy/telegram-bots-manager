import { Button, Form, Input, Typography } from "antd";
import { rules } from "../../utils/rules";

type FieldType = {
  token?: string;
};

export default function AddUserBotForm() {
  const onFinish = () => {};

  return (
    <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
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
            "Укажите корректный токен бота, например, 1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
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
          // loading={user.status === "loading"}
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
