import { Spin } from "antd";

import style from "./style/appSpinner.module.css";

export default function AppSpinner() {
  return (
    <div className={style.spin}>
      <Spin size="large" />
    </div>
  );
}
