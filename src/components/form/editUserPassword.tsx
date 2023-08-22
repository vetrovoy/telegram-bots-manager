import React from "react";

import { IUser } from "../../types/app";
import { Button, Form, Input, Typography } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector.";
import { rules } from "../../utils/rules";

interface IEditUserPassword {
  user: IUser;
}

export default function EditUserPassword({ user }: IEditUserPassword) {
  const userStatus = useTypedSelector((state) => state.app.status);

  const onFinish = () => {};

  return (
    <>
      <Form
        name="login"
        layout="vertical"
        onFinish={onFinish}
      >
        <Typography.Text
          type="secondary"
          style={{ display: "inline-block", marginBottom: 16 }}
        >
          Мы просим ввести старый (текущий) пароль в целях безопасности вашего
          профиля
        </Typography.Text>

        <Form.Item
          name="password"
          rules={[rules.required("Подтвердите старый пароль!")]}
        >
          <Input.Password placeholder="Старый пароль" />
        </Form.Item>

        <Form.Item
          name="password-new"
          rules={[rules.required("Введите новый пароль!")]}
        >
          <Input.Password placeholder="Новый пароль" />
        </Form.Item>

        <Form.Item>
          <Button
            loading={userStatus === "loading"}
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
