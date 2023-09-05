import { Link } from "react-router-dom";

import { Card } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import { IConstructor } from "../../../types/app";
import { routeNames } from "../../../route/routes";

import style from "./style/constructorsList.module.css";

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

type ConstructorsListProps = { list: IConstructor[] };

export default function ConstructorsList({ list }: ConstructorsListProps) {
  return (
    <>
      <Card title="Мои сценарии">
        {list.map((item) => {
          return (
            <Card.Grid
              className={style.item}
              hoverable={true}
              style={gridStyle}
            >
              <Link to={`${routeNames.CONSTRUCTOR}${item.id}`}>
                {item.name}
                <SettingOutlined className={style.icon} />
              </Link>
            </Card.Grid>
          );
        })}
      </Card>
    </>
  );
}
