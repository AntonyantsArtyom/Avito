import styled from "styled-components";

export const StyledContainer = styled.div`
  padding-top: 10px;

  display: grid;
  grid-template-columns: 348px 1fr;
  grid-template-rows: 200px auto auto;
  gap: 10px;

  grid-template-areas:
    "gallery     moderationHistory"
    "fullInfo    fullInfo         "
    "buttonsArea buttonsArea      ";
`;

export const StyledButtonsArea = styled.div`
  grid-area: buttonsArea;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

export const StyledNavigation = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;

  display: flex;
  justify-content: space-between;
`;
