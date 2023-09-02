import { Button, Form, Input, Typography } from "antd";

import { rules } from "../../utils/rules";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTranslate } from "../../hooks/useTranslate";
import { IUser } from "../../types/app";

type Props = {
  username: IUser["username"];
};

export default function EditUserUsername({ username }: Props) {
  const t = useTranslate();
  const user = useTypedSelector((state) => state.user);

  const onFinish = () => {};

  return (
    <>
      <Form name="login" layout="vertical" onFinish={onFinish}>
        <Typography.Text
          type="secondary"
          style={{ display: "inline-block", marginBottom: 16 }}
        >
          {t(
            "Вы можете задать логин, чтобы в дальнейшем использовать его для входа на сайт либо для передачи доступа.",
          )}
        </Typography.Text>

        <Form.Item
          initialValue={username}
          name="username"
          rules={[rules.required(t("Введите имя пользователя!"))]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            loading={user.status === "loading"}
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            {t("Сохранить")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
