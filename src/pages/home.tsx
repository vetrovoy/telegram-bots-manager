import { Card, Layout } from "antd";

import LoginUserForm from "../components/user/form/login/loginUserForm";

import style from "./style/home.module.css";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout>
      <Content className={style.content}>
        <div className={style.wrapper}>
          <Card title="Вход" className={style.card}>
            <LoginUserForm />
          </Card>
        </div>
      </Content>
    </Layout>
  );
}
