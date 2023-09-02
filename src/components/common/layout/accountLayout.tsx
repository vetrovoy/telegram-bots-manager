import React from "react";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";

import Header from "../header/header";

import { useTranslate } from "../../../hooks/useTranslate";

import Sidebar from "./sidebar";

import style from "./style/accountLayout.module.css";

export type Breadcrumbs = {
  path: string;
  title: string;
};

type AccountLayoutProps = {
  title: string;
  subtitle: string;
  breadcrumbs?: Breadcrumbs[];
  children?: React.ReactNode;
};

export default function AccountLayout({
  children,
  title,
  subtitle,
  breadcrumbs,
}: AccountLayoutProps) {
  const t = useTranslate();
  return (
    <Layout>
      <Sidebar />

      <Layout>
        <Header title={title} subtitle={subtitle} />

        <Layout className={style.layout}>
          {breadcrumbs && (
            <Breadcrumb className={style.breadcrumb}>
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
