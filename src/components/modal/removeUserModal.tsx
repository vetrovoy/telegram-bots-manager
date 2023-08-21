import { Modal, Typography } from "antd";
import React, { useState } from "react";

type Props = {
  username: string;
};

export default function RemoveUserModal({ username }: Props) {
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
      <Typography.Link type="secondary" onClick={showModal}>
        Удалить профиль
      </Typography.Link>
      <Modal
        title="Вы уверены, что хотите полностью удалить профиль?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Да"}
        cancelText={"Нет"}
      >
        <Typography.Text type="secondary">
          ⚠️ Это действие нельзя будет отменить
        </Typography.Text>
      </Modal>
    </>
  );
}
