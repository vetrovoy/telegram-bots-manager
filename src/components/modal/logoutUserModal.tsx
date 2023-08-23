import { Modal, Typography } from "antd";

import { useTypedDispatch } from "../../hooks/useTypedSelector.";
import userAsyncActions from "../../store/user/user-async-actions";

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
      title="Вы уверены, что хотите выйти?"
      open={visible}
      onOk={handleOkFunc}
      onCancel={handleCancelFunc}
      okText={"Да"}
      cancelText={"Нет"}
    >
      <Typography.Text type="secondary">
        ⚠️ Ваша сессия сбросится, и вам придется войти заново
      </Typography.Text>
    </Modal>
  );
}
