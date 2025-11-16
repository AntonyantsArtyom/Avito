import { Table } from "antd";
import type { IAdvertisement } from "../../types/Advertisement";
import { StyledCard } from "./AdvertisementModerationHistory.styles";
import dayjs from "dayjs";
import { formatActionToRU } from "../../../../shared/utils/formatActionsToRU";

export const AdvertisementModerationHistory = ({ moderationHistory }: Pick<IAdvertisement, "moderationHistory">) => {
  return (
    <StyledCard>
      <Table
        pagination={false}
        columns={[
          {
            title: "Модератор",
            dataIndex: "moderatorName",
            key: "moderatorName",
          },
          {
            title: "Дата",
            dataIndex: "timestamp",
            key: "timestamp",
            render: (value: string) => {
              return dayjs(value).format("YYYY.MM.DD HH:mm");
            },
          },
          {
            title: "Действие",
            dataIndex: "action",
            key: "action",
            render: (value: string) => {
              return formatActionToRU(value);
            },
          },
          {
            title: "Причина",
            dataIndex: "reason",
            key: "reason",
          },
          {
            title: "Комментарий",
            dataIndex: "comment",
            key: "comment",
          },
        ]}
        dataSource={moderationHistory}
        locale={{
          emptyText: "нет элементов истории",
        }}
      />
    </StyledCard>
  );
};
