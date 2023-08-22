import { useState } from "react";
import { Button, Modal } from "antd";
import AddBotForm from "../form/addUserBotForm";

interface IAddUserBotFormModal {
  title: string;
  style?: React.CSSProperties;
}

export default function AddUserBotFormModal({
  title,
  style,
}: IAddUserBotFormModal) {
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
      <Button type="primary" onClick={showModal} style={style}>
        {title}
      </Button>
      <Modal
        title="Токен Telegram API"
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
