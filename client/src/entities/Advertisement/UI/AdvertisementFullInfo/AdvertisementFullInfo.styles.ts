import { Card, Typography } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  grid-area: fullInfo;

  &&& {
    .ant-card-body {
      display: grid;
      gap: 20px;
    }
  }
`;

export const StyledSellerInfo = styled.div`
  display: grid;
  grid-template-columns: max-content 10px max-content;
  grid-template-rows: max-content max-content;
  grid-template-areas:
    "name     name name        "
    "totalAds .... registeredAt";
`;

export const StyledName = styled(Typography.Title)`
  &&& {
    grid-area: name;
  }
`;

export const StyledTotalAds = styled(Typography.Text)`
  &&& {
    grid-area: totalAds;
  }
`;

export const StyledRegisteredAt = styled(Typography.Text)`
  &&& {
    grid-area: registeredAt;
    justify-self: end;
  }
`;
