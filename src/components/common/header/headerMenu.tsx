import { useState, useMemo } from "react";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import AddUserBotFormModal from "../../modal/addUserBotFormModal";
import LogoutUserModal from "../../modal/logoutUserModal";

import { routeNames } from "../../../route/routes";
import { useTranslate } from "../../../hooks/useTranslate";

import style from "./style/headerMenu.module.css";

export default function HeaderMenu() {
  const t = useTranslate();
  const location = useLocation();

  const headerMenuRoutes: MenuProps["items"] = useMemo(() => {
    return [
      {
        key: routeNames.DASHBOARD,
        label: localStorage.getItem("username"),
      },
      {
        key: routeNames.ACCOUNT,
        label: t(`Личный кабинет`),
      },
      {
        key: "EXIT",
        label: t(`Выйти`),
      },
    ];
  }, [t]);

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
      <div className={style.container}>
        <AddUserBotFormModal
          className={style.userForm}
          title={t("Создать бота")}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
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
