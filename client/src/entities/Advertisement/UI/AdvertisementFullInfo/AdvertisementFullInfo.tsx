import { Table, Typography } from "antd";
import type { IAdvertisement } from "../../types/Advertisement";
import { StyledCard, StyledName, StyledRegisteredAt, StyledSellerInfo, StyledTotalAds } from "./AdvertisementFullInfo.styles";

export const AdvertisementFullInfo = ({ characteristics, seller }: Pick<IAdvertisement, "characteristics" | "seller">) => {
  return (
    <StyledCard>
      <div>
        <Typography.Title level={4}>Характеристики</Typography.Title>
        <Table
          pagination={false}
          showHeader={false}
          columns={[
            {
              dataIndex: "key",
              key: "key",
            },
            {
              dataIndex: "value",
              key: "value",
            },
          ]}
          dataSource={Object.entries(characteristics).map(([key, value]) => ({ key, value }))}
        />
      </div>
      <StyledSellerInfo>
        <StyledName level={4}>
          Продавец: {seller.name} ★ {seller.rating}
        </StyledName>
        <StyledTotalAds>{seller.totalAds} объявлений</StyledTotalAds>
        <StyledRegisteredAt>на сайте {seller.registeredAt}</StyledRegisteredAt>
      </StyledSellerInfo>
    </StyledCard>
  );
};
