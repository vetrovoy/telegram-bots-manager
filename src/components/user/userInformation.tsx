import { useMemo } from "react";
import { Badge, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";

import { useTranslate } from "../../hooks/useTranslate";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IUser } from "../../types/app";

type Props = {
  username: IUser["username"];
};

export default function UserInformation({ username }: Props) {
  const bots = useTypedSelector((state) => state.bots.bots);
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
        children: bots.length,
        span: 4,
      },
    ];
  }, [t, bots]);

  return <Descriptions bordered items={items} />;
}
