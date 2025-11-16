import { Card } from "antd";
import styled from "styled-components";

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export const StyledCard = styled(Card)`
  &&& {
    .ant-card-body {
      padding: 10px;
    }
  }
`;
