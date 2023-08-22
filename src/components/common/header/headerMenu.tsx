import { useState } from "react";
import { Menu, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import AddUserBotFormModal from "../../modal/addUserBotFormModal";
import LogoutUserModal from "../../modal/logoutUserModal";

import { routeNames } from "../../../route/routes";

const headerMenuRoutes: MenuProps["items"] = [
  {
    key: routeNames.DASHBOARD,
    label: localStorage.getItem("username"),
  },
  {
    key: routeNames.ACCOUNT,
    label: `Личный кабинет`,
  },
  {
    key: "EXIT",
    label: `Выйти`,
  },
];

export default function HeaderMenu({}) {
  const [isShowLogoutModal, setIsShowLogoutModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleMenuItemClick = (v: { key: string }) => {
    if (v.key === "EXIT") {
      setIsShowLogoutModal(true);
    } else {
      navigate(v.key);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <AddUserBotFormModal
          style={{ display: "block", height: "64px", borderRadius: 0 }}
          title="Создать бота"
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[routeNames.DASHBOARD]}
          items={headerMenuRoutes}
          onClick={handleMenuItemClick}
        />
      </div>
      <LogoutUserModal
        visible={isShowLogoutModal}
        handleOk={() => setIsShowLogoutModal(false)}
        onCancel={() => setIsShowLogoutModal(false)}
      />
    </>
  );
}
