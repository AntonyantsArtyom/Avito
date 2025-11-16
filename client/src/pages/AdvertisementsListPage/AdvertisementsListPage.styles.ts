import { Card } from "antd";
import styled from "styled-components";

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 450px 1fr;
  gap: 10px;
`;

export const StyledItemsContainer = styled.div`
  display: grid;
  gap: 10px;

  max-height: calc(100vh);
  overflow-y: scroll;

  position: relative;
  padding-bottom: 62px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledPaginationCard = styled(Card)`
  position: fixed;
  bottom: 10px;

  left: 50%;

  &&& {
    .ant-card-body {
      padding: 5px;
      display: grid;
      place-content: center;
    }
  }
`;

export const StyledAsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;
