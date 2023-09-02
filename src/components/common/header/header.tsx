import { Layout, Typography } from "antd";

import HeaderMenu from "./headerMenu";

import style from "./style/header.module.css";

type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <Layout.Header className={style.wrapper}>
      <div className={style.container}>
        <Typography.Text strong={true}>{title}</Typography.Text>
        <Typography.Text type="secondary">{subtitle}</Typography.Text>
      </div>

      <HeaderMenu />
    </Layout.Header>
  );
}
