import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdvertisementFullInfo } from "../../entities/Advertisement/UI/AdvertisementFullInfo/AdvertisementFullInfo";
import { AdvertisementModerationHistory } from "../../entities/Advertisement/UI/AdvertisementModerationHistory/AdvertisementModerationHistory";
import { StyledButtonsArea, StyledContainer, StyledNavigation } from "./AdvertisementsItemPage.styles";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useAdvertisementStore } from "../../entities/Advertisement/model/AdvertisementStore";
import { AdvertisementGallery } from "../../entities/Advertisement/UI/AdvertisementGallery/AdvertisementGallery";
import { AdvertisementsApproveAction } from "../../features/AdvertisementsControlActions/AdvertisementsApproveAction/AdvertisementsApproveAction";
import { AdvertisementsRejectAction } from "../../features/AdvertisementsControlActions/AdvertisementRejectAction/AdvertisementRejectAction";
import { AdvertisementsRequestChangesAction } from "../../features/AdvertisementsControlActions/AdvertisementsRequestChangesAction/AdvertisementsRequestChangesAction";
import { ToListNavButton } from "../../shared/UI/ToListNavButton/ToListNavButton";

export const AdvertisementsItemPage = () => {
  const { advertisement, fetchAdvertisement } = useAdvertisementStore();
  const navigate = useNavigate();

  const { getNextAdvertisementId, getPrevAdvertisementId } = useAdvertisementStore();

  useEffect(() => {
    const url = new URL(window.location.href);
    fetchAdvertisement(+url.pathname.split("/").pop()!);
  }, [window.location.href]);

  const handleNext = async () => {
    const nextId = await getNextAdvertisementId();
    navigate(`/item/${nextId}`);
  };

  const handlePrev = async () => {
    const prevId = await getPrevAdvertisementId();
    navigate(`/item/${prevId}`);
  };

  if (!advertisement) return null;

  return (
    <StyledContainer>
      <AdvertisementGallery images={advertisement.images} />
      <AdvertisementModerationHistory moderationHistory={advertisement.moderationHistory} />
      <AdvertisementFullInfo characteristics={advertisement.characteristics} seller={advertisement.seller} />
      <StyledButtonsArea>
        <AdvertisementsApproveAction advertisement={advertisement} />
        <AdvertisementsRejectAction advertisement={advertisement} />
        <AdvertisementsRequestChangesAction advertisement={advertisement} />
      </StyledButtonsArea>

      <StyledNavigation>
        <ToListNavButton />

        <div>
          <Typography.Text style={{ cursor: "pointer" }} onClick={handlePrev}>
            <LeftOutlined />
            Предыдущий
          </Typography.Text>
          {" | "}
          <Typography.Text style={{ cursor: "pointer" }} onClick={handleNext}>
            Следующий
            <RightOutlined />
          </Typography.Text>
        </div>
      </StyledNavigation>
    </StyledContainer>
  );
};
