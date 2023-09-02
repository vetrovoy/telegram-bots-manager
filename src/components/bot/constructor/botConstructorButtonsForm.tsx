import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useState } from "react";

import { useTranslate } from "../../../hooks/useTranslate";

import { TConstructorButton } from "../../../types/app";
import { rules } from "../../../utils/rules";

import BotConstructorButtonForm from "./botConstructorButtonForm";

import style from "./style/botConstructorButtonsForm.module.css";

type TBotConstructorButtonsFormProps = {
  initialButtons: TConstructorButton[];
  onSave: (buttons: TConstructorButton[]) => void;
};

export default function BotConstructorButtonsForm({
  initialButtons,
  onSave,
}: TBotConstructorButtonsFormProps) {
  const [formButtons] = Form.useForm();

  const t = useTranslate();

  const [buttons, setButtons] = useState<TConstructorButton[]>(initialButtons);

  const onFinish = (values: TConstructorButton) => {
    const button: TConstructorButton = {
      id: new Date().getTime(),
      name: values.name,
    };
    setButtons((p: TConstructorButton[]) => [...p, button]);

    formButtons.resetFields();
  };

  return (
    <>
      <Typography.Title level={5}>{t("Меню")}</Typography.Title>

      <Row className={style.row}>
        {buttons &&
          buttons.map((b: TConstructorButton) => {
            return (
              <Col span={12}>
                <BotConstructorButtonForm
                  setButtonResponse={setButtons}
                  key={b.id}
                  buttons={buttons}
                  button={b}
                />
              </Col>
            );
          })}
      </Row>

      <Form
        form={formButtons}
        name="constructor_form_buttons"
        onFinish={onFinish}
        autoComplete="off"
        className={style.container}
      >
        <Form.Item
          name={"name"}
          rules={[rules.required(t("Введите название!"))]}
        >
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
    </>
  );
}
