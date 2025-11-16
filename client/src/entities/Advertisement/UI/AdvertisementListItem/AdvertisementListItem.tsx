import { formatStatusToRU } from "../../../../shared/utils/formatStatusToRU";
import type { IAdvertisement } from "../../types/Advertisement";
import {
  StyledButton,
  StyledCard,
  StyledCategoryAndDate,
  StyledImage,
  StyledPrice,
  StyledTagsContainer,
  StyledTextContainer,
  StyledTitle,
} from "./AdvertisementListItem.styles";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import dayjs from "dayjs";

export const AdvertisementListItem = ({
  title,
  price,
  category,
  status,
  createdAt,
  priority,
  images,
  id,
}: Pick<IAdvertisement, "title" | "price" | "category" | "createdAt" | "id" | "status" | "priority" | "images">) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/item/${id}`);
  }, [navigate]);

  return (
    <StyledCard>
      <StyledTagsContainer>
        {priority === "urgent" && <Tag color="error">{"Срочное"}</Tag>}
        <Tag>{formatStatusToRU(status)}</Tag>
      </StyledTagsContainer>
      <StyledImage src={images[0]} alt={title} />
      <StyledTextContainer>
        <StyledTitle>{title}</StyledTitle>
        <StyledPrice>{price}₽</StyledPrice>
        <StyledCategoryAndDate>
          {category} ● {dayjs(createdAt).format("YYYY.MM.DD HH:mm")}
        </StyledCategoryAndDate>
        <StyledButton type="primary" onClick={handleClick}>
          Открыть
          <ArrowRightOutlined />
        </StyledButton>
      </StyledTextContainer>
    </StyledCard>
  );
};
