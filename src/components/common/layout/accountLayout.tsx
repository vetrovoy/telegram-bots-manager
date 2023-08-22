import React from "react";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";

import Sidebar from "../sidebar";
import Header from "../header/header";

import { routeNames } from "../../../route/routes";

interface IAccountLayout {
  title: string;
  subtitle: string;
  path: string;
  children?: React.ReactNode;
}

export default function AccountLayout({
  children,
  title,
  subtitle,
  path,
}: IAccountLayout) {
  return (
    <Layout>
      <Sidebar />

      <Layout>
        <Header title={title} subtitle={subtitle} />

        <Layout style={{ margin: "16px 34px" }}>
          <Breadcrumb style={{ marginBottom: "34px" }}>
            <Breadcrumb.Item>
              <Link to={routeNames.HOME}>Главная</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={path}>{title}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>

          {children}
        </Layout>
      </Layout>
    </Layout>
  );
}
