import { Button, Card, Typography } from "antd";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 850px;

  &&& {
    .ant-card-body {
      display: grid;
      grid-template-columns: max-content 1fr;
      padding-right: 5px;
      gap: 20px;
    }
  }
`;

export const StyledTitle = styled(Typography.Title)`
  &&& {
    grid-area: title;
    font-size: 24px;
    margin-bottom: 0;
  }
`;

export const StyledPrice = styled(Typography.Text)`
  &&&& {
    grid-area: price;
    font-size: 24px;
  }
`;

export const StyledCategoryAndDate = styled(Typography.Text)`
  &&&& {
    grid-area: category;
    font-size: 16px;
  }
`;

export const StyledTextContainer = styled.div`
  display: grid;

  grid-template-columns: max-content 1fr max-content 120px;
  grid-template-rows: max-content 1fr max-content 1fr max-content;

  align-items: center;

  grid-template-areas:
    "title    title title ......"
    ".....    ..... ..... ......"
    "price    price price ......"
    "........ ....  ..... ......"
    "category date  ..... button";

  width: 100%;
  gap: 5px;
`;

export const StyledButton = styled(Button)`
  &&& {
    grid-area: button;
    place-self: center;
    width: 120px;
  }
`;

export const StyledImage = styled.img`
  width: 120px;
  height: 120px;
`;

export const StyledTagsContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  margin: 5px;

  display: flex;
  gap: 5px;

  &&& {
    .ant-tag {
      margin-inline-end: 0;
    }
  }
`;
