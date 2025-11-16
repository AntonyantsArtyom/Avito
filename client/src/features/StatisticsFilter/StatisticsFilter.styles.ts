import { Card, Input } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  height: fit-content;

  &&& {
    .ant-card-body {
      display: grid;
      gap: 10px;
      padding: 10px;
    }
  }
`;

export const StyledPriceInput = styled(Input.Group)`
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;

  &&& {
    .ant-input-number {
      width: 100%;
    }
  }
`;

export const StyledSpace = styled.div`
  height: 10px;
`;
