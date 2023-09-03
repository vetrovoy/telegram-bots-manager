import { Col, Form, Row, Typography } from "antd";
import { useState } from "react";

import { useTranslate } from "../../../hooks/useTranslate";

import { IConstructorButton } from "../../../types/app";

import ConstructorButtonFormModal from "../modal/constructorButtonFormModal";
import ConstructorButtonsForm from "../from/constructorButtonsForm";

import style from "./style/constructorButtons.module.css";

type IConstructorButtonsProps = {
  initialButtons: IConstructorButton[];
  onSave: (buttons: IConstructorButton[]) => void;
};

export default function ConstructorButtons({
  initialButtons,
  onSave,
}: IConstructorButtonsProps) {
  const t = useTranslate();

  const [buttons, setButtons] = useState<IConstructorButton[]>(initialButtons);

  return (
    <div className={style.wrapper}>
      <Typography.Title level={5}>{t("Меню")}</Typography.Title>

      <Row className={style.row}>
        {buttons &&
          buttons.map((button: IConstructorButton) => {
            return (
              <Col span={12}>
                <ConstructorButtonFormModal
                  setButton={setButtons}
                  key={button.id}
                  buttons={buttons}
                  button={button}
                />
              </Col>
            );
          })}
      </Row>

      <ConstructorButtonsForm initialButtons={buttons} onSave={onSave} />
    </div>
  );
}
