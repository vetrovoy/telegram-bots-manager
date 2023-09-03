import { useState, useCallback } from "react";
import { DeleteOutlined } from "@ant-design/icons";

import TextArea from "antd/es/input/TextArea";
import { Button, Form, Row } from "antd";

import { rules } from "../../../utils/rules";
import { IConstructorButton } from "../../../types/app";

import { useTranslate } from "../../../hooks/useTranslate";

import style from "./style/constructorButtonForm.module.css";

export type ConstructorButtonFormProps = {
  buttons: IConstructorButton[];
  button: IConstructorButton;
  setButton: (buttons: IConstructorButton[]) => void;
};

export type ConstructorButtonFormProps2 = {
  buttons: IConstructorButton[];
  button: IConstructorButton;
  setButton: (buttons: IConstructorButton[]) => void;
  onFinish?: () => void;
  onRemove?: () => void;
};

export default function ConstructorButtonForm({
  buttons,
  button,
  setButton,
  onFinish,
  onRemove,
}: ConstructorButtonFormProps2) {
  const t = useTranslate();
  const [response, setResponse] = useState<string>(
    button?.response?.message ? button?.response?.message : "",
  );

  const onFinishForm = (v: { response: string }) => {
    setResponse(v.response);

    // Находим индекс элемента button в массиве buttons
    const newButtonIndex = buttons.findIndex((b) => b.id === button.id);
    if (newButtonIndex !== -1) {
      const newButton: IConstructorButton = {
        ...buttons[newButtonIndex],
        response: { id: new Date().getTime(), message: v.response },
      };

      // Создаем новый массив newButtons, копируя элементы до индекса newButtonIndex,
      // добавляя newButton и копируя оставшиеся элементы после индекса newButtonIndex
      const newButtons: IConstructorButton[] = [
        ...buttons.slice(0, newButtonIndex),
        newButton,
        ...buttons.slice(newButtonIndex + 1),
      ];

      setButton(newButtons);
    }

    if (onFinish) {
      onFinish();
    }
  };

  const removeButton: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      const newButtons: IConstructorButton[] = buttons.filter(
        (b) => b.name !== button.name,
      );

      setButton(newButtons);

      if (onRemove) {
        onRemove();
      }
    }, [buttons, setButton, button.name]);

  return (
    <Form
      name={`constructor_form_button-${button.id}`}
      onFinish={onFinishForm}
      autoComplete="off"
    >
      <Form.Item
        name={"response"}
        rules={[rules.required(t("Введите сообщение!"))]}
      >
        <TextArea
          defaultValue={button.response?.message}
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
  );
}
