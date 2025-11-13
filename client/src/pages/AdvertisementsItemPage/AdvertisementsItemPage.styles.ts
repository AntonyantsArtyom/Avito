import styled from "styled-components";

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content max-content max-content;
  gap: 10px;

  grid-template-areas:
    "........    moderationHistory"
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
