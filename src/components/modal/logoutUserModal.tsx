import { Modal, Typography } from "antd";

import { useTypedDispatch } from "../../hooks/useTypedSelector";
import userAsyncActions from "../../store/user/user-async-actions";
import { useTranslate } from "../../hooks/useTranslate";

type Props = {
  visible: boolean;
  handleOk: () => any;
  onCancel: () => any;
};

export default function LogoutUserModal({
  visible,
  handleOk,
  onCancel,
}: Props) {
  const t = useTranslate();

  const dispatch = useTypedDispatch();

  const handleOkFunc = () => {
    dispatch(userAsyncActions.logout());
    handleOk();
  };

  const handleCancelFunc = () => {
    onCancel();
  };

  return (
    <Modal
      title={t(`Вы уверены, что хотите выйти?`)}
      open={visible}
      onOk={handleOkFunc}
      onCancel={handleCancelFunc}
      okText={t("Да")}
      cancelText={t("Нет")}
    >
      <Typography.Text type="secondary">
        ⚠️ {t("Ваша сессия сбросится, и вам придется войти заново")}
      </Typography.Text>
    </Modal>
  );
}
