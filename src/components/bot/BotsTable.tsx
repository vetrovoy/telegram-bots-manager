import { useMemo } from "react";
import { Badge, Popover, Space, Table } from "antd";

import { ColumnsType } from "antd/es/table";
import { MoreOutlined } from "@ant-design/icons";

import { IBot } from "../../types/app";

import BotPopoverSettings from "./botPopoverSettings";

type Props = {
  loading?: boolean;
  bots: IBot[];
};

interface DataType extends IBot {
  key: string;
}

const columns: ColumnsType<IBot> = [
  {
    title: "Статус",
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
    title: "Имя",
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
    title: "Дата создания",
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
            <MoreOutlined style={{ fontSize: 24, rotate: "90deg" }} />
          </Popover>
        </Space>
      );
    },
  },
];

export default function BotsTable({ bots, loading }: Props) {
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
