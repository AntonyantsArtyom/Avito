import { Card, Input } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  margin: 10px 0;
  height: fit-content;

  &&& {
    .ant-card-body {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
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
