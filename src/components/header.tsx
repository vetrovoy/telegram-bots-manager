import { setUser, setUserStatus, setUserMessage } from "../store/user/user";
import { Layout, Menu, Typography, theme, MenuProps } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { useTypedSelector, useTypedDispatch } from "../hooks/useTypedSelector.";
import { useNavigate } from "react-router-dom";

import { routeNames } from "../route/routes";
import { useState } from "react";
import LogoutUserModal from "./modal/logoutUserModal";

interface IHeader {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: IHeader) {
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

  const navigate = useNavigate();
  const disptach = useTypedDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isShowLogoutModal, setIsShowLogoutModal] = useState<boolean>(false);

  const handleMenuItemClick = (v: { key: string }) => {
    if (v.key === "EXIT") {
      setIsShowLogoutModal(true);
    } else {
      navigate(v.key);
    }
  };

  return (
    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: "34px",
        paddingRight: "0",
        background: colorBgContainer,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography.Text strong={true}>{title}</Typography.Text>
        <Typography.Text type="secondary">{subtitle}</Typography.Text>
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[routeNames.DASHBOARD]}
          items={headerMenuRoutes}
          onClick={handleMenuItemClick}
        />
        <LogoutUserModal
          visible={isShowLogoutModal}
          handleOk={() => setIsShowLogoutModal(false)}
          onCancel={() => setIsShowLogoutModal(false)}
        />
      </div>
    </Layout.Header>
  );
}
