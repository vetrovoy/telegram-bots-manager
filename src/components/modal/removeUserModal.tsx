import { Modal, Typography } from "antd";
import { useState } from "react";

import { useTypedDispatch } from "../../hooks/useTypedSelector";
import userAsyncActions from "../../store/user/user-async-actions";
import { useTranslate } from "../../hooks/useTranslate";

type Props = {
  username: string;
};

export default function RemoveUserModal({ username }: Props) {
  const t = useTranslate();
  const dispatch = useTypedDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(userAsyncActions.logout());
  };

  return (
    <>
      <Typography.Link type="secondary" onClick={() => setIsModalOpen(true)}>
        {t("Удалить профиль")}
      </Typography.Link>
      <Modal
        title={t("Вы уверены, что хотите полностью удалить профиль?")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText={t("Да")}
        cancelText={t("Нет")}
      >
        <Typography.Text type="secondary">
          ⚠️ {t("Это действие нельзя будет отменить")}
        </Typography.Text>
      </Modal>
    </>
  );
}
