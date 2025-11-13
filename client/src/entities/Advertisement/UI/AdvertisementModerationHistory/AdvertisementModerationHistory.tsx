import { Table, Typography } from "antd";
import type { IAdvertisement } from "../../types/Advertisement";
import { StyledCard } from "./AdvertisementModerationHistory.styles";

export const AdvertisementModerationHistory = ({ moderationHistory }: Pick<IAdvertisement, "moderationHistory">) => {
  return (
    <StyledCard>
      <Typography.Title level={4}>История модерации</Typography.Title>
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
