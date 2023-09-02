import { Layout, Typography } from "antd";

import HeaderMenu from "./headerMenu";

import style from "./style/header.module.css";

interface IHeader {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: IHeader) {
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
