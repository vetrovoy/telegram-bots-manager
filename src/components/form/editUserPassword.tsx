import { Button, Form, Input, Typography } from "antd";

import { IUser } from "../../types/app";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { rules } from "../../utils/rules";
import { useTranslate } from "../../hooks/useTranslate";

interface IEditUserPassword {
  user: IUser;
}

export default function EditUserPassword({ user }: IEditUserPassword) {
  const t = useTranslate();
  const userStatus = useTypedSelector((state) => state.user.status);

  const onFinish = () => {};

  return (
    <>
      <Form name="login" layout="vertical" onFinish={onFinish}>
        <Typography.Text
          type="secondary"
          style={{ display: "inline-block", marginBottom: 16 }}
        >
          {t(
            "Мы просим ввести старый (текущий) пароль в целях безопасности вашего профиля",
          )}
        </Typography.Text>

        <Form.Item
          name="password"
          rules={[rules.required(t("Подтвердите старый пароль!"))]}
        >
          <Input.Password placeholder={t("Старый пароль")} />
        </Form.Item>

        <Form.Item
          name="password-new"
          rules={[rules.required(t("Введите новый пароль!"))]}
        >
          <Input.Password placeholder={t("Новый пароль")} />
        </Form.Item>

        <Form.Item>
          <Button
            loading={userStatus === "loading"}
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
