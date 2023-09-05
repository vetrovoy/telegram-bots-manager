import { Button, Empty } from "antd";

type ConstructorEmptyProps = {};

export default function ConstructorEmpty({}: ConstructorEmptyProps) {
  return (
    <Empty
      imageStyle={{ height: 60 }}
      description={<span>Сценарии отсутствуют</span>}
    >
      <Button type="primary">Создать новый</Button>
    </Empty>
  );
}
