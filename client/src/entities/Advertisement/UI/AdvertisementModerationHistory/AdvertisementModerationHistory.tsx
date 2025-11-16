import { Table } from "antd";
import type { IAdvertisement } from "../../types/Advertisement";
import { StyledCard } from "./AdvertisementModerationHistory.styles";
import dayjs from "dayjs";

export const AdvertisementModerationHistory = ({ moderationHistory }: Pick<IAdvertisement, "moderationHistory">) => {
  return (
    <StyledCard>
      {moderationHistory.length > 0 && (
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
        />
      )}
    </StyledCard>
  );
};
