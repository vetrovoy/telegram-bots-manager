import { Modal, Typography } from "antd";
import { useState } from "react";

import { useTypedDispatch } from "../../hooks/useTypedSelector.";
import userAsyncActions from "../../store/user/user-async-actions";

type Props = {
  username: string;
};

export default function RemoveUserModal({ username }: Props) {
  const dispatch = useTypedDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(userAsyncActions.logout());
  };

  return (
    <>
      <Typography.Link type="secondary" onClick={() => setIsModalOpen(true)}>
        Удалить профиль
      </Typography.Link>
      <Modal
        title="Вы уверены, что хотите полностью удалить профиль?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
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
