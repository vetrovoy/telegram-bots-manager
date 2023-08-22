import { Badge, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";

type Props = {
  username: string;
};

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Статус",
    children: <Badge status="processing" text="Активен" />,
    span: 4,
  },
  {
    key: "2",
    label: "Депозит",
    children: "0 RUB.",
    span: 4,
  },
  {
    key: "3",
    label: "Моих ботов",
    children: "0",
    span: 4,
  },
];

export default function UserInformation({ username }: Props) {
  return <Descriptions bordered items={items} />;
}
