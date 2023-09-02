import { useState } from "react";

import TextArea from "antd/es/input/TextArea";
import { Button, Form, Modal, Tooltip } from "antd";

import { useTranslate } from "../../../hooks/useTranslate";

import { rules } from "../../../utils/rules";

import { TConstructorButton } from "../../../types/app";

import style from "./style/botConstructorButtonForm.module.css";

type BotConstructorButtonFormProps = {
  buttons: TConstructorButton[];
  button: TConstructorButton;
  setButtonResponse: (buttons: TConstructorButton[]) => void;
};

export default function BotConstructorButtonForm({
  buttons,
  button,
  setButtonResponse,
}: BotConstructorButtonFormProps) {
  const t = useTranslate();
  const [response, setResponse] = useState<string>(
    button?.response ? button?.response : "",
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (v: { response: string }) => {
    setResponse(v.response);

    const newButton: TConstructorButton | undefined = buttons.find(
      (b) => b.id === button.id,
    );
    const newButtonsFiltered: TConstructorButton[] = buttons.filter(
      (b) => b.id !== button.id,
    );

    if (newButton) {
      newButton.response = v.response;

      const newButtons: TConstructorButton[] = [
        ...newButtonsFiltered,
        newButton,
      ];

      setButtonResponse(newButtons);
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title={response}>
        <Button
          className={style.button}
          type="dashed"
          onClick={() => setIsModalOpen(true)}
        >
          {button.name}
        </Button>
      </Tooltip>

      <Modal
        title={`${t("Введите возвращаемое значение")}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name={`constructor_form_button-${button.id}`}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name={"response"}
            rules={[rules.required(t("Введите сообщение!"))]}
          >
            <TextArea
              defaultValue={button.response}
              placeholder={t("Сообщение")}
              rows={4}
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
      </Modal>
    </>
  );
}
