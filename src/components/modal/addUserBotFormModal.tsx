import { useState } from "react";
import { Button, Modal } from "antd";

import AddBotForm from "../form/addUserBotForm";
import { useTranslate } from "../../hooks/useTranslate";

interface IAddUserBotFormModal {
  title: string;
  className?: string;
}

export default function AddUserBotFormModal({
  title,
  className,
}: IAddUserBotFormModal) {
  const t = useTranslate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className={className}>
        {title}
      </Button>
      <Modal
        title={`${t("Токен")} Telegram API`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AddBotForm onFinish={handleCancel} />
      </Modal>
    </>
  );
}
