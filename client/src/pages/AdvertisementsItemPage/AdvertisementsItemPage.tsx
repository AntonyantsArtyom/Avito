import { useEffect, useState } from "react";
import type { IAdvertisement } from "../../entities/Advertisement/types/Advertisement";
import { AdvertisementFullInfo } from "../../entities/Advertisement/UI/AdvertisementFullInfo/AdvertisementFullInfo";
import { AdvertisementModerationHistory } from "../../entities/Advertisement/UI/AdvertisementModerationHistory/AdvertisementModerationHistory";
import { StyledButtonsArea, StyledContainer, StyledNavigation } from "./AdvertisementsItemPage.styles";
import { CheckOutlined, ReloadOutlined, CloseOutlined, ArrowLeftOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";

export const AdvertisementsItemPage = () => {
  const [advertisement, setAdvertisement] = useState<IAdvertisement | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.pathname.split("/").pop();

    if (id) {
      fetch(`http://localhost:3001/api/v1/ads/${id}`)
        .then((response) => response.json())
        .then((data) => setAdvertisement(data));
    }
  }, []);

  if (!advertisement) return null;

  return (
    <StyledContainer>
      <AdvertisementModerationHistory moderationHistory={advertisement.moderationHistory} />
      <AdvertisementFullInfo characteristics={advertisement.characteristics} seller={advertisement.seller} />
      <StyledButtonsArea>
        <Button type="primary" size="large" icon={<CheckOutlined />}>
          Одобрить
        </Button>
        <Button type="primary" size="large" icon={<CloseOutlined />}>
          Отклонить
        </Button>
        <Button type="primary" size="large" icon={<ReloadOutlined />}>
          Доработка
        </Button>
        <StyledNavigation>
          <Typography.Text>
            <ArrowLeftOutlined />К списку
          </Typography.Text>

          <div>
            <Typography.Text>
              <LeftOutlined />
              Предыдущий
            </Typography.Text>
            {" | "}
            <Typography.Text>
              Следующий
              <RightOutlined />
            </Typography.Text>
          </div>
        </StyledNavigation>
      </StyledButtonsArea>
    </StyledContainer>
  );
};
