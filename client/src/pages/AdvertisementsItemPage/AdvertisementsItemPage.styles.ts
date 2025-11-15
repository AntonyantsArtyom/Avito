import styled from "styled-components";

export const StyledContainer = styled.div`
  height: calc(100vh - 20px);
  margin-top: 10px;

  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 200px 1fr max-content max-content;
  gap: 10px;

  grid-template-areas:
    "gallery     moderationHistory"
    "fullInfo    fullInfo         "
    "buttonsArea buttonsArea      "
    "navigation  navigation       ";
`;

export const StyledButtonsArea = styled.div`
  grid-area: buttonsArea;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

export const StyledNavigation = styled.div`
  grid-area: navigation;

  display: flex;
  justify-content: space-between;
`;
