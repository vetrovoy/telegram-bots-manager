import { Layout, Typography } from "antd";

import HeaderMenu from "./headerMenu";

interface IHeader {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: IHeader) {
  return (
    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: "34px",
        paddingRight: "0",
        background: "#fff",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography.Text strong={true}>{title}</Typography.Text>
        <Typography.Text type="secondary">{subtitle}</Typography.Text>
      </div>

      <HeaderMenu />
    </Layout.Header>
  );
}
