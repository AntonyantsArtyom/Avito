import { Card } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  grid-area: gallery;

  overflow-y: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &&& {
    .ant-card-body {
      display: grid;
      gap: 10px;
    }
  }
`;

export const StyledImage = styled.img`
  height: 200px;
  width: 300px;
`;
