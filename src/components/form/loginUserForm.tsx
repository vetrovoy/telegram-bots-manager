import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

import { rules } from "../../utils/rules";
import userAsyncActions from "../../store/user/user-async-actions";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../hooks/useTypedSelector";
import { IUser } from "../../types/app";
import { routeNames } from "../../route/routes";

import style from "./style/loginUserForm.module.css";

type FieldType = {
  username?: string;
  password?: string;
};

export default function LoginUserForm() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user);

  const onFinish = (values: IUser) => {
    dispatch(userAsyncActions.login(values));
  };

  useEffect(() => {
    if (user.user && user.status === "success") {
      navigate(routeNames.DASHBOARD);
    }
  }, [user.status, navigate]);

  return (
    <>
      <Form name="login" layout="vertical" onFinish={onFinish}>
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
            className={style.button}
          >
            Принять
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
