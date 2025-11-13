import styled from "styled-components";

export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content max-content;
  gap: 10px;

  grid-template-areas:
    "........ moderationHistory"
    "fullInfo fullInfo         ";
`;
