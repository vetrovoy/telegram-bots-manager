import { Button, Form, Input } from "antd";
import { useState } from "react";

import { useTranslate } from "../../../hooks/useTranslate";

import { IConstructorButton } from "../../../types/app";
import { rules } from "../../../utils/rules";

import style from "./style/constructorButtonsForm.module.css";

type IConstructorButtonsFormProps = {
  initialButtons: IConstructorButton[];
  onSave: (buttons: IConstructorButton[]) => void;
};

export default function ConstructorButtonsForm({
  initialButtons,
  onSave,
}: IConstructorButtonsFormProps) {
  const [formButtons] = Form.useForm();

  const t = useTranslate();

  const [buttons, setButtons] = useState<IConstructorButton[]>(initialButtons);

  const onFinish = (values: IConstructorButton) => {
    const button: IConstructorButton = {
      id: new Date().getTime(),
      name: values.name,
    };
    setButtons((p: IConstructorButton[]) => [...p, button]);

    formButtons.resetFields();
  };

  return (
    <Form
      form={formButtons}
      name="constructor_form_buttons"
      onFinish={onFinish}
      autoComplete="off"
      className={style.container}
    >
      <Form.Item name={"name"} rules={[rules.required(t("Введите название!"))]}>
        <Input placeholder={t("Название")} />
      </Form.Item>

      <Form.Item>
        <Button type="dashed" htmlType="submit">
          {t("Добавить кнопку")}
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={() => onSave(buttons)}>
          {t("Принять")}
        </Button>
      </Form.Item>
    </Form>
  );
}
