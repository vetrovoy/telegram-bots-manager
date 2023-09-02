import { Button, Form, Input, Typography } from "antd";

import { rules } from "../../../../utils/rules";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useTranslate } from "../../../../hooks/useTranslate";
import { IUser } from "../../../../types/app";

import style from "./style/editUserUsername.module.css";

type EditUserUsernameProps = {
  username: IUser["username"];
};

export default function EditUserUsername({ username }: EditUserUsernameProps) {
  const t = useTranslate();
  const user = useTypedSelector((state) => state.user);

  const onFinish = () => {};

  return (
    <>
      <Form name="login" layout="vertical" onFinish={onFinish}>
        <Typography.Text type="secondary" className={style.text}>
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
            className={style.button}
          >
            {t("Сохранить")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
