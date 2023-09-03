import { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";

import { Button, Modal, Tooltip } from "antd";

import { useTranslate } from "../../../hooks/useTranslate";

import ConstructorButtonForm from "../from/constructorButtonForm";

import { ConstructorButtonFormProps } from "../from/constructorButtonForm";

import style from "./style/constructorButtonFormModal.module.css";

export default function ConstructorButtonFormModal({
  button,
  buttons,
  setButton,
}: ConstructorButtonFormProps) {
  const t = useTranslate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title={button?.response?.message}>
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
        <ConstructorButtonForm
          button={button}
          buttons={buttons}
          setButton={setButton}
          onFinish={() => setIsModalOpen(false)}
          onRemove={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}
