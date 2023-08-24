import React from "react";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";

import Sidebar from "../sidebar";
import Header from "../header/header";

import { useTranslate } from "../../../hooks/useTranslate";

export type Breadcrumbs = {
  path: string;
  title: string;
};

interface IAccountLayout {
  title: string;
  subtitle: string;
  breadcrumbs?: Breadcrumbs[];
  children?: React.ReactNode;
}

export default function AccountLayout({
  children,
  title,
  subtitle,
  breadcrumbs,
}: IAccountLayout) {
  const t = useTranslate();
  return (
    <Layout>
      <Sidebar />

      <Layout>
        <Header title={title} subtitle={subtitle} />

        <Layout style={{ margin: "16px 34px" }}>
          {breadcrumbs && (
            <Breadcrumb style={{ marginBottom: "34px" }}>
              {breadcrumbs.map(({ title, path }) => {
                return (
                  <Breadcrumb.Item key={path}>
                    <Link to={path}>{t(title)}</Link>
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          )}

          {children}
        </Layout>
      </Layout>
    </Layout>
  );
}
