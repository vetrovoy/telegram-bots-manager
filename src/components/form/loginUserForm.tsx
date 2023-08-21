import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { rules } from "../../utils/rules";
import userActions from "../../store/user/user-actions";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector.";
import { IUser } from "../../types/user";
import { routeNames } from "../../route/routes";

type FieldType = {
  username?: string;
  password?: string;
};

export default function LoginUserForm() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user);

  const onFinish = (values: IUser) => {
    dispatch(userActions.login(values));
  };

  useEffect(() => {
    if (user.status === "success") {
      navigate(routeNames.DASHBOARD);
    }
  }, [user.status]);

  return (
    <>
      <Form
        name="login"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Имя"
          name="username"
          rules={[rules.required("Введите имя пользователя!")]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[rules.required("Введите пароль!")]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            loading={user.status === "loading"}
            type="primary"
            htmlType="submit"
            style={{ marginTop: "20px" }}
          >
            Принять
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
