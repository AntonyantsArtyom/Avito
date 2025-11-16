import { Card } from "antd";
import styled from "styled-components";

export const StyledContainer = styled.div`
  display: grid;
  gap: 10px;
`;

export const StyledCard = styled(Card)`
  &&& {
    .ant-card-body {
      padding: 10px;
    }
  }
`;
