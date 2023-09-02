import { Spin } from "antd";

import style from "./style/appSpin.module.css";

export default function AppSpin() {
  return (
    <div className={style.spin}>
      <Spin size="large" />
    </div>
  );
}
