import { useState } from "react";
import { Button, Modal } from "antd";
import AddBotForm from "../form/addUserBotForm";

interface IAddUserBotFormModal {
  title: string;
}

export default function AddUserBotFormModal({ title }: IAddUserBotFormModal) {
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
      <Button
        style={{ display: "block", marginTop: 30 }}
        type="primary"
        onClick={showModal}
      >
        {title}
      </Button>
      <Modal
        title="Токен Telegram API"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AddBotForm />
      </Modal>
    </>
  );
}
