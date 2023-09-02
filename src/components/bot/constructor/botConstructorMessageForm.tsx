import { Button, Form, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

import { TConstructor } from "../../../types/app";

import { useTranslate } from "../../../hooks/useTranslate";
import { rules } from "../../../utils/rules";

type Props = {
  initialMessage: TConstructor["message"];
  onSave: (message: string) => void;
};

export default function BotConstructorMessageForm({
  initialMessage,
  onSave,
}: Props) {
  const t = useTranslate();

  const onFinish = (v: { message: string }) => {
    onSave(v.message);
  };

  return (
    <>
      <Typography.Title level={5}>{t("Стартовое сообщение")}</Typography.Title>
      <Form
        name={`constructor_form_message`}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name={"message"}
          rules={[rules.required(t("Введите сообщение!"))]}
        >
          <TextArea
            defaultValue={initialMessage}
            rows={4}
            placeholder={t("Ваше сообщение")}
            maxLength={100}
            showCount={true}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("Принять")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
