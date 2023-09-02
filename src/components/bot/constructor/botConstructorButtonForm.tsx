import { useState, useCallback } from "react";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";

import TextArea from "antd/es/input/TextArea";
import { Button, Form, Modal, Row, Tooltip } from "antd";

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

    // Находим индекс элемента button в массиве buttons
    const newButtonIndex = buttons.findIndex((b) => b.id === button.id);
    if (newButtonIndex !== -1) {
      const newButton: TConstructorButton = {
        ...buttons[newButtonIndex],
        response: v.response,
      };

      // Создаем новый массив newButtons, копируя элементы до индекса newButtonIndex,
      // добавляя newButton и копируя оставшиеся элементы после индекса newButtonIndex
      const newButtons: TConstructorButton[] = [
        ...buttons.slice(0, newButtonIndex),
        newButton,
        ...buttons.slice(newButtonIndex + 1),
      ];

      setButtonResponse(newButtons);
    }

    setIsModalOpen(false);
  };

  const removeButton: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      const newButtons: TConstructorButton[] = buttons.filter(
        (b) => b.name !== button.name,
      );

      setButtonResponse(newButtons);
      setIsModalOpen(false);
    }, [buttons, setButtonResponse, button.name]);

  return (
    <>
      <Tooltip title={response}>
        <Button
          className={style.button}
          type="dashed"
          onClick={() => setIsModalOpen(true)}
        >
          {button.name}

          <SettingOutlined />
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

          <Row className={style.row}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("Принять")}
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="text" onClick={removeButton}>
                <DeleteOutlined />
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
