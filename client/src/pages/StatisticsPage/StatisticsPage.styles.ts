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
  padding-bottom: 10px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledAsideContainer = styled.div`
  margin: 10px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
