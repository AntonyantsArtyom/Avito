import type { IAdvertisement } from "../../types/Advertisement";
import { StyledButton, StyledCard, StyledCategoryAndDate, StyledImage, StyledPrice, StyledTextContainer, StyledTitle } from "./AdvertisementListItem.styles";
import Placeholder from "../../../../assets/Placeholder.svg";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AdvertisementListItem = ({ title, price, category, createdAt, id }: Pick<IAdvertisement, "title" | "price" | "category" | "createdAt" | "id">) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/item/${id}`);
  }, [navigate]);

  return (
    <StyledCard>
      <StyledImage src={Placeholder} alt={title} />
      <StyledTextContainer>
        <StyledTitle>{title}</StyledTitle>
        <StyledPrice>{price}₽</StyledPrice>
        <StyledCategoryAndDate>
          {category} ● {createdAt}
        </StyledCategoryAndDate>
        <StyledButton type="primary" onClick={handleClick}>
          Открыть
          <ArrowRightOutlined />
        </StyledButton>
      </StyledTextContainer>
    </StyledCard>
  );
};
