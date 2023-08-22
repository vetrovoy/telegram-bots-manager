import { Modal, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { setUser, setUserMessage, setUserStatus } from "../../store/app/app";
import { routeNames } from "../../route/routes";
import { useTypedDispatch } from "../../hooks/useTypedSelector.";

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
  const navigate = useNavigate();
  const disptach = useTypedDispatch();

  const handleOkFunc = () => {
    navigate(routeNames.LOGIN);
    localStorage.setItem("username", "");
    disptach(setUserStatus("idle"));
    disptach(setUserMessage(""));
    disptach(setUser(null));

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
