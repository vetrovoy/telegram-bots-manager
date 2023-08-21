import { Button, Form, Input, Typography } from "antd";
import { rules } from "../../utils/rules";
import { useTypedSelector } from "../../hooks/useTypedSelector.";

type Props = {
  username: string;
};

export default function EditUserUsername({ username }: Props) {
  const user = useTypedSelector((state) => state.user);

  const onFinish = () => {};

  return (
    <>
      <Form
        name="login"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Typography.Text
          type="secondary"
          style={{ display: "inline-block", marginBottom: 16 }}
        >
          Вы можете задать логин, чтобы в дальнейшем использовать его для входа
          на сайт либо для передачи доступа.
        </Typography.Text>

        <Form.Item
          initialValue={username}
          name="username"
          rules={[rules.required("Введите имя пользователя!")]}
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
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
