import { useMemo } from "react";
import { Badge, Popover, Space, Table } from "antd";

import { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";

import { IBot } from "../../../types/app";
import { useTranslate } from "../../../hooks/useTranslate";

import BotPopoverSettings from "../settings/botPopoverSettings";

import style from "./style/botsTable.module.css";

type BotsTableProps = {
  loading?: boolean;
  bots: IBot[];
};

interface DataType extends IBot {
  key: string;
}

export default function BotsTable({ bots, loading }: BotsTableProps) {
  const t = useTranslate();

  const columns: ColumnsType<IBot> = useMemo(() => {
    return [
      {
        title: t("Статус"),
        dataIndex: "status",
        key: "status",
        render: (text) =>
          text === "processing" ? (
            <Badge status={text} color="blue" />
          ) : (
            <Badge status={text} color="red" />
          ),
      },
      {
        title: t("Имя"),
        dataIndex: "bot_username",
        key: "bot_username",
        render: (text, record) => (
          <a
            target="_blank"
            href={`https://t.me/${record.bot_username}`}
            rel="noreferrer"
          >
            {text}
          </a>
        ),
      },

      {
        title: t("Дата создания"),
        dataIndex: "timestamp",
        key: "timestamp",
        render: (timestamp) => new Date(timestamp).toLocaleString("ru-RU"),
      },
      {
        title: "",
        key: "action",
        render: (_, record) => {
          return (
            <Space size="middle">
              <Popover
                placement="bottom"
                content={<BotPopoverSettings bot={record} />}
              >
                <MoreOutlined className={style.iconMore} />
              </Popover>
            </Space>
          );
        },
      },
    ];
  }, [t]);

  const formattedData = (): DataType[] => {
    const extendedData = bots.map((bot) => ({
      key: bot.id.toString(),
      ...bot,
    }));
    const sortedData = extendedData.sort((a, b) => b.timestamp - a.timestamp);
    return sortedData;
  };

  const data: DataType[] = useMemo(() => formattedData(), [bots]);
  return (
    <Table
      loading={loading}
      pagination={{ pageSize: 4 }}
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.id}
    />
  );
}
