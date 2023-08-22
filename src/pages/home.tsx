import { Card, Layout } from "antd";

import LoginUserForm from "../components/form/loginUserForm";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout>
      <Content style={{ margin: "0 16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 64px)",
          }}
        >
          <Card
            title="Вход"
            style={{ maxWidth: 600, width: "100%", textAlign: "center" }}
          >
            <LoginUserForm />
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
