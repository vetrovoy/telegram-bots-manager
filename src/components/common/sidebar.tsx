import React, { useState, useMemo } from "react";
import {
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { routeNames } from "../../route/routes";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutUserModal from "../modal/logoutUserModal";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function Sidebar() {
  const sidebarMenuRoutes: MenuItem[] = useMemo(() => {
    return [
      getItem(localStorage.getItem("username"), "USERNAME", <UserOutlined />, [
        getItem("Личный кабинет", routeNames.ACCOUNT),
      ]),
      getItem("Мои боты", routeNames.DASHBOARD, <DesktopOutlined />),
      getItem("Выйти", "EXIT", <LogoutOutlined />),
    ];
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [isShowLogoutModal, setIsShowLogoutModal] = useState<boolean>(false);

  const handleMenuItemClick = (v: { key: string }) => {
    if (v.key === "EXIT") {
      setIsShowLogoutModal(true);
    } else {
      navigate(v.key);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical"></div>
      <Menu
        onClick={handleMenuItemClick}
        theme="dark"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={["USERNAME"]}
        mode="inline"
        items={sidebarMenuRoutes}
      />
      <LogoutUserModal
        visible={isShowLogoutModal}
        handleOk={() => setIsShowLogoutModal(false)}
        onCancel={() => setIsShowLogoutModal(false)}
      />
    </Sider>
  );
}
