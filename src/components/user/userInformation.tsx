import { useMemo } from "react";
import { Badge, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";

import { useTranslate } from "../../hooks/useTranslate";

type Props = {
  username: string;
};

export default function UserInformation({ username }: Props) {
  const t = useTranslate();

  const items: DescriptionsProps["items"] = useMemo(() => {
    return [
      {
        key: "1",
        label: t("Статус"),
        children: <Badge status="processing" text={t("Активен")} />,
        span: 4,
      },
      {
        key: "2",
        label: t("Депозит"),
        children: "0 RUB.",
        span: 4,
      },
      {
        key: "3",
        label: t("Моих ботов"),
        children: "0",
        span: 4,
      },
    ];
  }, []);

  return <Descriptions bordered items={items} />;
}
