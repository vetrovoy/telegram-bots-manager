import React from "react";
import { Link } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";

import Header from "../header/header";

import { useTranslate } from "../../../hooks/useTranslate";

import AppSidebar from "./appSidebar";

import style from "./style/appLayout.module.css";

export type Breadcrumbs = {
  path: string;
  title: string;
};

type AppLayoutProps = {
  title: string;
  subtitle: string;
  breadcrumbs?: Breadcrumbs[];
  children?: React.ReactNode;
};

export default function AppLayout({
  children,
  title,
  subtitle,
  breadcrumbs,
}: AppLayoutProps) {
  const t = useTranslate();
  return (
    <Layout>
      <AppSidebar />

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
