import type { IAdvertisement } from "../types/Advertisement";
import { StyledButton, StyledCard, StyledCategoryAndDate, StyledImage, StyledPrice, StyledTextContainer, StyledTitle } from "./Advertisement.styles";
import Placeholder from "../../../assets/Placeholder.svg";
import { ArrowRightOutlined } from "@ant-design/icons";

export const Advertisement = ({ title, price, category, createdAt, id }: Pick<IAdvertisement, "title" | "price" | "category" | "createdAt" | "id">) => {
  return (
    <StyledCard>
      <StyledImage src={Placeholder} alt={title} />
      <StyledTextContainer>
        <StyledTitle>{title}</StyledTitle>
        <StyledPrice>{price}₽</StyledPrice>
        <StyledCategoryAndDate>
          {category} ● {createdAt}
        </StyledCategoryAndDate>
        <StyledButton type="primary">
          Открыть
          <ArrowRightOutlined />
        </StyledButton>
      </StyledTextContainer>
    </StyledCard>
  );
};
